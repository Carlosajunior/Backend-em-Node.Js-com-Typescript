import { ListEntitiesModel } from '@/modules/common/shared/models'
import { ListTagsDTO } from '@/modules/common/tags/dtos'
import { Tag } from '@/modules/common/tags/entities'
import { ListTagsService } from '@/modules/common/tags/services'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('tags')
@Controller('tags')
export class ListTagsController {
  constructor(private readonly listTagsService: ListTagsService) { }

  @Get()
  async handle(@Query() {
    page,
    records_per_page: recordsPerPage,
    search,
    category,
    to_approve
  }: ListTagsDTO): Promise<ListEntitiesModel<Tag>> {
    try {
      return this.listTagsService.list({
        page: page && Math.floor(page),
        records_per_page: recordsPerPage && Math.floor(recordsPerPage),
        search,
        category,
        to_approve
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
