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
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';

import { Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { getRepository } from 'typeorm';
import { MessageDTO, MessageType } from '../dtos';
import { SendVacancyMessageDTO } from '../dtos/send-vacancy-message.dto';
import { MessagesRepository } from '../repositories';
import { DecrementUserMessageQuotaPerDayService } from './decrement-user-message-quota-per-day.service';

@Injectable()
export class SendVacancyMessageService {
  constructor(
    private readonly decrementUserMessageQuota: DecrementUserMessageQuotaPerDayService,
    private readonly messagesRepository: MessagesRepository,
    private readonly templateRepository: TemplateRepository,
    private vacancyRepository: VacancyRepository
  ) {}
  public async execute(request: SendVacancyMessageDTO): Promise<void> {
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

    const vacancy = await this.vacancyRepository.findOne({
      where: {
        id: request.vacancy_id
      }
    });

    if (!vacancy) {
      throw new Error('Vaga não localizada.');
    }

    const vacancyURL =
      process.env.JOB_PORTAL_URL + 'vacancies/details/' + vacancy.id;

    message.vacancy_id = vacancy.id;

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
      throw new Error('Não foi possível recuperar dados do usuário.');
    }

    const currentDatabaseUser = await getRepository(User).findOne({
      where: { email }
    });
    const signature: string = currentDatabaseUser.email_signature;

    const message_quota: string = user?.UserAttributes.find(
      (attr) => attr.Name === 'custom:message_quota'
    )?.Value;

    if (!message_quota) {
      throw new Error('Não foi possível recuperar os dados do usuário.');
    }

    if (Number(message_quota) <= 0) {
      throw new Error('Você atingiu sua cota diária de envio de SMS/E-mails.');
    }

    if (Number(message_quota) < request.recipients.length) {
      throw new Error(
        `Você não pode enviar um SMS/Email para ${
          request.recipients.length
        } pessoas. Cota atual: ${Number(message_quota)}.`
      );
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

        message.email_content =
          (template.description || '') +
          '<br/>' +
          (template.vacancy_url_text || '') +
          '<br/>' +
          (vacancyURL || '') +
          '<br/>' +
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
  }
}
