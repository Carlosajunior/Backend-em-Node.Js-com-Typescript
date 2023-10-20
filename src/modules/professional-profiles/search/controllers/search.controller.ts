import { BadRequestException, Controller, Get, Headers, Query } from '@nestjs/common'
import { ListEntitiesModel } from '@/modules/common/shared/models'
import { Profile } from '../../profiles/entities'
import { GetSearchProfilesService } from '../services'
import { ApiTags } from '@nestjs/swagger'
import { SearchWithFiltersDTO } from '../dtos/search-with-filters.dto'

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class GetProfileBySearchController {
  constructor(private readonly getSearchProfilesService: GetSearchProfilesService) { }

  @Get('busca')
  async handle(@Headers("groups") headers: Array<string>, @Query() {
    page,
    records_per_page: recordsPerPage,
    search,
    uds,
    impedido
  }: SearchWithFiltersDTO): Promise<ListEntitiesModel<Profile>> {
    try {
      return this.getSearchProfilesService.list({
        page: page && Math.floor(page),
        records_per_page: recordsPerPage && Math.floor(recordsPerPage),
        search,
        uds,
        impedido
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

}
