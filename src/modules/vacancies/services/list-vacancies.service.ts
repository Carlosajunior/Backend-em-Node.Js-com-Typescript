import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { Service } from '@/modules/common/shared/core/service';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ListAdheringProfessionalsByVacancyIdService } from '../adhering-professionals/services/list-adhering-professionals-by-vacancy-id.service';
import { SearchVacanciesDTO } from '../dtos/search-vacancies.dto';
import { VacancyModel } from '../models/vacancy.model';
import { VacancyRepository } from './../repositories/vacancy.repository';

@Injectable()
export class ListVacanciesService
  implements Service<SearchVacanciesDTO, ListEntitiesModel<VacancyModel>>
{
  public constructor(
    private readonly vacancyRepository: VacancyRepository,
    private readonly listAdheringProfessionalsByVacancyIdService: ListAdheringProfessionalsByVacancyIdService
  ) { }

  public async execute(
    request: SearchVacanciesDTO
  ): Promise<ListEntitiesModel<VacancyModel>> {
    switch (request.type_search) {
      case TypeSearch.SEARCH: {
        const result = await this.vacancyRepository.paginateBySearch(request);
        for await (const vacancy of result.results) {
          const total_candidates = (await this.listAdheringProfessionalsByVacancyIdService.execute({ vacancy_id: vacancy.id })).results.length
          result.results[result.results.indexOf(vacancy)].total_candidates = total_candidates
        }
        return result
      }
      case TypeSearch.PARAMS: {
        if (request?.tags?.length > 10) {
          throw new BadRequestException(
            'O usuário poder selecionar até 10 tags.'
          );
        }

        const result =  await this.vacancyRepository.paginateByParams(request);
        for await (const vacancy of result.results) {
          const total_candidates = (await this.listAdheringProfessionalsByVacancyIdService.execute({ vacancy_id: vacancy.id })).results.length
          result.results[result.results.indexOf(vacancy)].total_candidates = total_candidates
        }
        return result
      }
      default:
        return null;
    }
  }
}
