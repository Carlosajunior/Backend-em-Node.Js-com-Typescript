import { Injectable, NotFoundException } from '@nestjs/common'
import { ListEntitiesModel } from '@/modules/common/shared/models'
import { Profile } from '../../profiles/entities'
import { SearchWithFiltersDTO } from '../dtos/search-with-filters.dto'
import { SearchProfilesRepository } from '../repositories'

@Injectable()
export class GetSearchProfilesService {
  constructor(private readonly searchProfilesRepository: SearchProfilesRepository) { }

  async list({
    page = 1,
    records_per_page: recordsPerPage = 15,
    search = '',
    uds,
    impedido,
  }: SearchWithFiltersDTO): Promise<ListEntitiesModel<Profile>> {
    try {
      return await this.searchProfilesRepository.findProfiles({
        page,
        records_per_page: recordsPerPage,
        search,
        uds,
        impedido
      })
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
