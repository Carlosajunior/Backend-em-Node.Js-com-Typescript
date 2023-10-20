import { Injectable, NotFoundException } from '@nestjs/common'
import { ListEntitiesModel } from '@/modules/common/shared/models'
import { ListTagsDTO } from '@/modules/common/tags/dtos'
import { Tag } from '@/modules/common/tags/entities'
import { TagsRepository } from '@/modules/common/tags/repositories'

@Injectable()
export class ListTagsService {
  constructor(private readonly tagsRepository: TagsRepository) { }

  async list({
    page = 1,
    records_per_page: recordsPerPage = 20,
    search = '',
    category,
    to_approve = false
  }: ListTagsDTO): Promise<ListEntitiesModel<Tag>> {
    try {
      return await this.tagsRepository.findTags({
        page,
        records_per_page: recordsPerPage,
        search,
        category,
        to_approve
      })
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
