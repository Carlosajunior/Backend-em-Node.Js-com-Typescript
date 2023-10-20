import { ProfessionalProfileRepository } from '@/modules/common/elastic/repositories/professional-profile.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { VacancyRepository } from '../../repositories/vacancy.repository';
import { ListAdheringProfessionalsDTO } from '../dtos/list-adhering-professionals.dto';

@Injectable()
export class ListAdheringProfessionalsByVacancyIdService
  /**implements
    Service<
      ListAdheringProfessionalsDTO,
      ListEntitiesModel<ElasticProfessionalProfile>
    >*/ {
  // repository from elastic
  public constructor(
    private readonly profileRepository: ProfessionalProfileRepository,
    private readonly vacancyRepository: VacancyRepository
  ) { }

  public async execute(
    request: ListAdheringProfessionalsDTO
  )/** : Promise<ListEntitiesModel<ElasticProfessionalProfile>>*/ {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id: request.vacancy_id },
      relations: ['tags']
    });

    if (!vacancy) throw new BadRequestException('Vacancy not found');

    return await this.profileRepository.findAdheringProfessionalsByVacancyId({
      ...request,
      tags: vacancy.tags
    });
  }
}

