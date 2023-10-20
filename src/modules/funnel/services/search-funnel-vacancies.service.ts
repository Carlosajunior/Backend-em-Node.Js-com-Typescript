import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Service } from '../../common/shared/core/service';
import { ListEntitiesModel } from '../../common/shared/models';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';
import { VacancyRepository } from '../../vacancies/repositories/vacancy.repository';
import { SearchFunnelVacanciesDTO } from '../dto/list-vacancies-by-funnel-id.dto';

export class SearchFunnelVacanciesRequest extends SearchFunnelVacanciesDTO {
  @IsUUID()
  @IsNotEmpty()
  funnel_id: string;
}

@Injectable()
export class SearchFunnelVacanciesService
  implements Service<SearchFunnelVacanciesRequest, any>
{
  public constructor(private readonly vacancyRepository: VacancyRepository) { }

  public async execute({
    funnel_id,
    page = 1,
    records_per_page = 5
  }: SearchFunnelVacanciesRequest): Promise<ListEntitiesModel<Vacancy>> {
    try {
      const [results, total_results] = await this.vacancyRepository.findAndCount({
        where: {
          funnel_id
        },
        take: records_per_page,
        skip: (page - 1) * records_per_page
      });

      const total_pages = Math.ceil(total_results / Number(records_per_page));

      return {
        page,
        results,
        total_pages,
        total_results,
        total_results_per_page: records_per_page
      };
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
