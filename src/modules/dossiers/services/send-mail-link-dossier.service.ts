import { RequestContext } from '@/modules/common/auth/middlewares';
import { Service } from '@/modules/common/shared/core/service';
import { SendEmailService } from '@/modules/messages/services';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { DossierStatus } from '../constants/dossier-status.constant';
import { SendMailLinkDossierDTO } from '../dtos/send-mail-link-dossier.dto';
import { DossierRepository } from '../repositories/dossier.repository';

@Injectable()
export class SendMailLinkDossierService
  implements Service<SendMailLinkDossierDTO, void>
{
  public constructor(
    private readonly dossierRepository: DossierRepository,
    private readonly observationRepository: ObservationsRepository,
    private readonly sendMail: SendEmailService,
    private readonly userRepository: UserRepository
  ) { }

  public async execute({
    observation_id
  }: SendMailLinkDossierDTO): Promise<void> {
    const { email } = RequestContext.currentUser();

    if (!process.env.JOB_PORTAL_URL) {
      throw new InternalServerErrorException(
        'URL do portal de vagas não foi configurada.'
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new BadRequestException('Dados inválidos!');
    }

    const observation = await this.observationRepository.findOne({
      where: {
        id: observation_id,
        profile: {
          active: true
        }
      },
      relations: ['profile']
    });

    if (!observation) {
      throw new BadRequestException('Dados inválidos!');
    }

    const dossier = await this.dossierRepository.findOne({
      where: {
        observation_id
      }
    });

    const newDossier = this.dossierRepository.create({
      ...dossier,
      created_at: dossier?.created_at || new Date(),
      dossier_status: DossierStatus.EMAIL_SENT,
      observation_id,
      profile_data_status: null,
      starts_at: new Date(),
      updated_at: new Date(),
      user_id: user.id
    });

    const createdDossier = await this.dossierRepository.save(newDossier);

    const vacancy_url =
      process.env.JOB_PORTAL_URL + 'dossiers/' + createdDossier.id;

    try {
      await this.sendMail.execute({
        message: {
          types: null,
          templates: null,
          sms_content: null,
          title: `Recrutamento UDS - Validação de dados (ação necessária)`,
          email_content: `
          Olá, ${observation.profile.name}!
          <br/>
          <br/>
          <br/>
          <br/>
          Você avançou mais uma etapa em nosso processo e estamos muito felizes por isso.
          <br/>
          <br/>
          Agora, precisamos que confirme seus dados profissionais e nos informe seu CPF para podermos elaborar uma carta proposta.
          <br/>
          <br/>
          Basta clicar <a href=${vacancy_url} target="_blank">aqui</a>!
          <br/>
          <br/>
          Caso tenha problemas com o link, basta copiar o endereço e colar em seu navegador
          <br/>
          (<a href=${vacancy_url} target="_blank">${vacancy_url}</a>).
          <br/>
          <br/>
          <br/>
          <br/>
          O link expira em 3 dias.
          <br/>
          <br/>
          <br/>
          <br/>
          Vamos juntos criar a transformação.
          <br/>
          <br/>
          <br/>
          <br/>
          Cordialmente,
          <br/>
          <br/>
          ${user.email_signature || ''}
          `
        },
        recipient: {
          email: observation.profile.email,
          name: observation.profile.name,
          phone: null
        },
        sender: {
          email,
          name: `${user.name} ${user.middle_name}`
            ?.normalize('NFD')
            ?.replace(/[\u0300-\u036f]/g, '')
        }
      });
    } catch (e) {
      console.error(e);

      await this.dossierRepository.save({
        ...createdDossier,
        dossier_status: DossierStatus.EMAIL_ERROR,
        updated_at: new Date()
      });

      throw new BadRequestException(e);
    }
  }
}
