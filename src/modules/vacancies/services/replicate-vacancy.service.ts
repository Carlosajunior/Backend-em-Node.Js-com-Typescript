import { Service } from '@/modules/common/shared/core/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReplicateVacancyDTO } from '../dtos/replicate-vacancy.dto';
import { VacancyRepository } from './../repositories/vacancy.repository';
import {
  CreateVacancyRequest,
  CreateVacancyService
} from './create-vacancy.service';

interface ReplicateVacancyRequest extends ReplicateVacancyDTO {
  creator_email: string;
}

@Injectable()
export class ReplicateVacancyService
  implements Service<ReplicateVacancyRequest, void>
{
  public constructor(
    private readonly createVacancy: CreateVacancyService,
    private readonly vacancyRepository: VacancyRepository
  ) {}
  public async execute(request: ReplicateVacancyRequest): Promise<void> {
    const baseVacancy = await this.vacancyRepository.findOne({
      where: {
        id: request.id
      },
      relations: ['tags', 'vacancy_languages']
    });

    if (!baseVacancy) {
      throw new BadRequestException('A vaga inserida não é válida.');
    }

    const data: CreateVacancyRequest = {
      ...request,
      ...baseVacancy,
      ignore_date_validation: true,
      languages:
        baseVacancy?.vacancy_languages?.map((lang) => ({
          id: lang.language_id,
          level: lang.level
        })) || [],
      tag_ids: baseVacancy?.tags?.map((tag) => tag.id) || []
    };

    return await this.createVacancy.execute(data);
  }
}
