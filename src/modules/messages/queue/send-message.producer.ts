import { queues } from '@/config/bull/bull';
import {
  awsConfig,
  cognitoIdentityServiceProvider
} from '@/modules/common/auth/config';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { TemplateDTO } from '@/modules/templates/dtos';
import { Template } from '@/modules/templates/entities';
import { TemplateRepository } from '@/modules/templates/repositories/template.repository';
import { User } from '@/modules/users/entities/user.entity';
import { Phone } from '@/modules/users/value-objects/phone';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { getRepository } from 'typeorm';
import { MessageDTO, MessageType } from '../dtos';
import { RecipientReqDTO, SendMessageDTO } from '../dtos/send-message.dto';
import { MessagesRepository } from '../repositories';
import { DecrementUserMessageQuotaPerDayService } from '../services/decrement-user-message-quota-per-day.service';

@Injectable()
export class SendMessageProducer {
  constructor(
    private readonly decrementUserMessageQuota: DecrementUserMessageQuotaPerDayService,
    private readonly messagesRepository: MessagesRepository,
    private readonly templateRepository: TemplateRepository,
    private readonly vacancyRepository: VacancyRepository
  ) {}

  async sendMessage(request: SendMessageDTO) {
    let successfullRecipients: RecipientReqDTO[] = [];
    const errorRecipients: RecipientReqDTO[] = [];
    const message: MessageDTO = {
      email_content: null,
      sms_content: null,
      templates: null,
      title: '',
      types: [],
      sender_email: null,
      sender_name: null,
      sms_title: null,
      vacancy_id: null
    };

    let vacancy: Vacancy = null;
    let vacancyURL = '';

    if (request.templates_ids.length < 1) {
      throw new Error('É necessário informar ao menos um template.');
    }

    request.templates_ids.forEach((id) => {
      if (!isUUID(id)) {
        throw new Error(`O id ${id} não é um uuid válido`);
      }
    });

    if (request.templates_ids.length > 2) {
      throw new Error(
        'Não é possível enviar mais do que 2 templates por requisição.'
      );
    }

    const { name, middle_name, email } = RequestContext.currentUser();
    const sender_name = `${name} ${middle_name}`
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const sender = {
      email: email,
      name: sender_name
    };

    const user = await cognitoIdentityServiceProvider
      .adminGetUser({
        UserPoolId: awsConfig.userPoolId,
        Username: RequestContext.currentUser().sub
      })
      .promise();

    if (!user) {
      throw new BadRequestException(
        'Não foi possível recuperar dados do usuário.'
      );
    }

    const currentDatabaseUser = await getRepository(User).findOne({
      where: { email }
    });

    if (!currentDatabaseUser) {
      throw new BadRequestException(
        'Não foi possível recuperar dados do usuário.'
      );
    }

    const signature: string = currentDatabaseUser.email_signature;

    const message_quota: string = user?.UserAttributes.find(
      (attr) => attr.Name === 'custom:message_quota'
    )?.Value;

    if (!message_quota) {
      throw new BadRequestException(
        'Não foi possível recuperar dados do usuário.'
      );
    }

    if (Number(message_quota) <= 0) {
      throw new BadRequestException(
        'Você atingiu sua cota diária de envio de SMS/E-mails.'
      );
    }

    if (Number(message_quota) < request.recipients.length) {
      throw new Error(
        `Você não pode enviar um SMS/Email para ${
          request.recipients.length
        } pessoas. Cota atual: ${Number(message_quota)}.`
      );
    }

    if (request.vacancy_id) {
      vacancy = await this.vacancyRepository.findOne({
        where: {
          id: request.vacancy_id
        },
        relations: ['observations']
      });

      if (!vacancy) {
        throw new Error('Vaga não localizada.');
      }

      message.vacancy_id = vacancy.id;

      vacancyURL =
        process.env.JOB_PORTAL_URL + 'vacancies/details/' + vacancy.id;

      if (vacancy?.observations?.length < 1) {
        successfullRecipients = request.recipients;
      } else {
        request.recipients.forEach((recipient) => {
          const observation = vacancy.observations.find(
            (obs) => obs.profile_id === recipient.id
          );
          if (observation) {
            if (observation.recruiter_id) {
              if (observation.recruiter_id === currentDatabaseUser.id) {
                successfullRecipients.push(recipient);
              } else {
                errorRecipients.push(recipient);
              }
            } else {
              successfullRecipients.push(recipient);
            }
          } else {
            successfullRecipients.push(recipient);
          }
        });
      }

      request.recipients = successfullRecipients;
    }

    const template01 = await this.templateRepository.findOne({
      where: {
        id: request.templates_ids[0]
      }
    });

    if (!template01) {
      throw new Error(
        `Não foi possível recuperar dados do template: ${request.templates_ids[0]}.`
      );
    }

    const templates: Template[] = [template01];

    if (request.templates_ids[1]) {
      const template02 = await this.templateRepository.findOne({
        where: {
          id: request.templates_ids[1]
        }
      });

      if (!template02) {
        throw new Error(
          `Não foi possível recuperar dados do template: ${request.templates_ids[1]}.`
        );
      }

      if (template01.type === template02.type) {
        throw new Error(
          'Você deve selecionar um template de cada tipo (SMS ou E-mail).'
        );
      }
      templates[1] = template02;
    }

    message.templates = templates?.map((template) => ({
      ...template
    })) as TemplateDTO[];

    message.templates?.forEach(async (template, index) => {
      if (template.type === 'email') {
        message.title = template.email_title || '';

        const vacancyText = request.vacancy_id
          ? (template.vacancy_url_text || '') +
            '<br/>' +
            (vacancyURL || '') +
            '<br/>'
          : '';

        message.email_content =
          (template.description || '') +
          '<br/>' +
          vacancyText +
          (template.whatsapp_text_of_recruiter || '') +
          '<br/>' +
          (currentDatabaseUser.whatsapp_business
            ? Phone.format(currentDatabaseUser.whatsapp_business)
            : '') +
          '<br/>' +
          (signature || '');

        message.types[index] = MessageType.Email;
        await this.decrementUserMessageQuota.execute({
          decrementNumber: request.recipients.length,
          messageQuota: Number(message_quota)
        });
      }

      if (template.type === 'sms') {
        message.sms_content = template.description;
        message.types[index] = MessageType.SMS;
        await this.decrementUserMessageQuota.execute({
          decrementNumber: request.recipients.length,
          messageQuota: Number(message_quota)
        });
      }
    });

    const created_message = await this.messagesRepository.createMessage({
      ...message,
      sender_email: email,
      sender_name
    });

    request.recipients.forEach((recipient) => {
      queues.sendMessageQueue.add(recipient.name, {
        recipient,
        sender,
        message: created_message
      });
    });

    await this.messagesRepository.save(created_message);

    return {
      errorRecipients,
      successfullRecipients: request?.vacancy_id
        ? successfullRecipients
        : request.recipients
    };
  }
}
