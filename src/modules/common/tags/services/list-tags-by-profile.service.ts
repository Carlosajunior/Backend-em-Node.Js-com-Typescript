import { Injectable, NotFoundException } from '@nestjs/common'
import { TagsToProfile } from '@/modules/common/tags/entities'
import { TagsToProfilesRepository } from '@/modules/common/tags/repositories'

@Injectable()
export class ListTagsByProfileService {
  constructor(private readonly tagsToProfileRepository: TagsToProfilesRepository,) { }

  async list(id: string): Promise<TagsToProfile[]> {
    try {
      return await this.tagsToProfileRepository.listTagsToProfileByProfile(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
