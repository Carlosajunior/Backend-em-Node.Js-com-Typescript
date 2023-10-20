import { Injectable } from '@nestjs/common'

import { ApplicationsRepository } from '../repositories'
import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { ListSearchModel } from '@/modules/common/shared/models'
import { FilterApplicationsDTO } from '../dtos/filter-applications.dto'

@Injectable()
export class FilterApplicationsService {
  constructor (
    private readonly applicationsRepository: ApplicationsRepository
  ) {}

  // Busca vagas na base de dados utilizando os parâmetros limite de consulta e o termo desejado(código ou título)
  async list ({
      records_limit,
      id,
      order_by,
      languages,
      work_modes,
      tags
  }: FilterApplicationsDTO): Promise<ListSearchModel<Profile>> {
    return await this.applicationsRepository.filterApplications({
      records_limit,
      id,
      order_by,
      languages,
      work_modes,
      tags
    })
  }

  async finByProfileId(profile_id: string) {
    return await this.applicationsRepository.finApplicationsByProfileId(profile_id)
  }
}
