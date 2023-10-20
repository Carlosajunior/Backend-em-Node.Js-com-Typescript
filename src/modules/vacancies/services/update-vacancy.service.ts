import { DateHelper } from '@/modules/common/helpers';
import { Service } from '@/modules/common/shared/core/service';
import { Tag } from '@/modules/common/tags/entities';
import { TagsRepository } from '@/modules/common/tags/repositories';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { addDays, isBefore } from 'date-fns';
import { UpdateVacancyDTO } from '../dtos/update-vacancy.dto';
import { handleVacancyCandidates } from '../queues/jobs/handle-vacancy-candidates';
import { UpdateVacancyLanguagesJob } from '../queues/jobs/update-vacancy-languages.job';
import { VacancyRepository } from '../repositories/vacancy.repository';
export interface UpdateVacancyRequest extends UpdateVacancyDTO {
  creator_email: string;
  id: number;
}

@Injectable()
export class UpdateVacancyService
  implements Service<UpdateVacancyRequest, void>
{
  public constructor(
    private readonly tagRepository: TagsRepository,
    private readonly updateVacancyLangsJob: UpdateVacancyLanguagesJob,
    private readonly userRepository: UserRepository,
    private readonly vacancyRepository: VacancyRepository
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

  public async execute(request: UpdateVacancyRequest): Promise<void> {
    let tags: Tag[] = [];

    if (request.status !== 'Aberto' && request.status !== 'Rascunho')
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

    const vacancy = await this.vacancyRepository.findOne({
      where: {
        id: request.id
      },
      relations: ['tags', 'vacancy_languages']
    });

    if (!vacancy) {
      throw new BadRequestException('É necessário informar uma vaga válida.');
    }

    if (!commercial.can_edit_vacancy) {
      if (vacancy.commercial_id !== commercial.id) {
        throw new BadRequestException(
          'O usuário informado não pode editar esta vaga.'
        );
      }
    }

    if (request?.tag_ids?.length > 0) {
      if (request?.tag_ids?.length === vacancy.tags.length) {
        if (
          request?.tag_ids.every((tag) =>
            vacancy.tags.map((tag) => tag.id).includes(tag)
          )
        ) {
          tags = vacancy.tags;
        }
      } else {
        tags = await this.tagRepository.findTagsByIds(request.tag_ids);
      }
    }

    const vacancyToCreate = this.vacancyRepository.create({
      ...request,
      id: vacancy.id,
      commercial_id: commercial.id,
      commercial,
      identify: vacancy.identify,
      tags
    });

    const updatedVacancy = await this.vacancyRepository.save(vacancyToCreate);

    this.updateVacancyLangsJob.execute({
      langs: request?.languages || null,
      vacancy_id: vacancy.id
    });

    handleVacancyCandidates(updatedVacancy);
  }
}
