import { DateHelper } from '@/modules/common/helpers';
import { Service } from '@/modules/common/shared/core/service';
import { Tag } from '@/modules/common/tags/entities';
import { TagsRepository } from '@/modules/common/tags/repositories';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { addDays, isBefore, isSameMonth } from 'date-fns';
import { IsNull, Not } from 'typeorm';
import { CreateVacancyDTO } from '../dtos/create-vacancy.dto';
import { UpdateVacancyLanguagesJob } from '../queues/jobs/update-vacancy-languages.job';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { GenerateVacancyIdentifierService } from './generate-vacancy-identifier.service';

export interface CreateVacancyRequest extends CreateVacancyDTO {
  creator_email: string;
  ignore_date_validation?: boolean;
}

@Injectable()
export class CreateVacancyService
  implements Service<CreateVacancyRequest, void>
{
  public constructor(
    private readonly generateVacancyIdentifier: GenerateVacancyIdentifierService,
    private readonly tagRepository: TagsRepository,
    private readonly userRepository: UserRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly updateVacancyLangsJob: UpdateVacancyLanguagesJob
  ) {}

  private validateDates(create_at: Date, expire_at: Date) {
    if (
      isBefore(
        DateHelper.formatDate(create_at),
        DateHelper.formatDate(new Date())
      )
    ) {
      throw new BadRequestException(
        'A data de início de trabalho não deve ser uma data anterior à atual.'
      );
    }

    if (
      isBefore(
        DateHelper.formatDate(expire_at),
        DateHelper.formatDate(new Date())
      )
    ) {
      throw new BadRequestException(
        'A data de encerramento não deve ser uma data anterior à atual.'
      );
    }

    if (
      isBefore(
        DateHelper.formatDate(expire_at),
        DateHelper.formatDate(create_at)
      )
    ) {
      throw new BadRequestException(
        'A data de encerramento não deve ser uma data anterior à data de início.'
      );
    }
  }
  public async execute(request: CreateVacancyRequest): Promise<void> {
    let identify: string = null;
    let tags: Tag[] = [];
    if (!request?.ignore_date_validation)
      this.validateDates(
        addDays(new Date(request.create_at), 1),
        addDays(new Date(request.expire_at), 1)
      );

    if (request?.customer_id) {
      if (!request?.contact_id) {
        throw new BadRequestException(
          'É obrigatório informar um contato responsável pela vaga que possuir um cliente.'
        );
      }
    }

    if (request?.state) {
      if (!request?.city) {
        throw new BadRequestException('É obrigatório informar um estado.');
      }
    }

    const commercial = await this.userRepository.findOne({
      where: {
        email: request.creator_email
      }
    });

    if (!commercial) {
      throw new BadRequestException('Usuário inválido!');
    }

    if (request?.tag_ids?.length > 0) {
      tags = await this.tagRepository.findTagsByIds(request.tag_ids);
    }

    const lastVacancy = await this.vacancyRepository.findOne({
      where: {
        identify: Not(IsNull())
      },
      order: {
        created_at: 'DESC'
      }
    });

    if (!lastVacancy || !isSameMonth(new Date(), lastVacancy?.created_at)) {
      identify = this.generateVacancyIdentifier.execute(1);
    } else {
      identify = String(Number(lastVacancy.identify) + 1);
    }

    const identifyAlreadyExists = await this.vacancyRepository.findOne({
      where: {
        identify
      }
    });

    if (identifyAlreadyExists) {
      identify = String(Number(identify) + 1);
    }

    const vacancy = this.vacancyRepository.create({
      ...request,
      id: null,
      commercial_id: commercial.id,
      commercial,
      identify,
      tags,
      created_at: new Date(),
      updated_at: new Date()
    });

    const createdVacancy = await this.vacancyRepository.save(vacancy);

    this.updateVacancyLangsJob.execute({
      langs: request?.languages || null,
      vacancy_id: createdVacancy.id
    });
  }
}
