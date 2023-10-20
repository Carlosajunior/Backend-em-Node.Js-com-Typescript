import { Injectable } from '@nestjs/common'

import { ApplicationsRepository } from '../repositories'
import { ApplyDTO } from '../dtos'
import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { ListEntitiesModel, ListSearchModel } from '@/modules/common/shared/models'
import { RequestContext } from '@/modules/common/auth/middlewares'

@Injectable()
export class GetApplicationsByVacancyIdService {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository
  ) { }

  // Busca vagas na base de dados utilizando os parâmetros limite de consulta e o termo desejado(código ou título)
  async list({
    records_per_page,
    page,
    vacancy_id
  }: ApplyDTO, headers: Array<string>): Promise<ListEntitiesModel<Profile>> {
    if (headers.includes("Recrutador")) {
      const { name, middle_name } = RequestContext.currentUser();
      const linked_by = `${name} ${middle_name}`
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return await this.applicationsRepository.findVacanciesForRecruiter({
        records_per_page,
        page,
        vacancy_id
      }, linked_by)
    }
    return await this.applicationsRepository.findVacancies({
      records_per_page,
      page,
      vacancy_id
    })
  }
}
