import { EntityRepository, Repository } from 'typeorm'
import { v4 } from 'uuid'

import { TagsToProfile } from '../entities'
@EntityRepository(TagsToProfile)
export class TagsToProfilesRepository extends Repository<TagsToProfile> {
  async createTagsToProfilesInBulk (data: any): Promise<TagsToProfile[]> {
    const promises = data.map(async tagProfile => {
      const createdTagsToProfile = this.create(tagProfile)
      return await this.save(createdTagsToProfile)
    })
    const tagProfiles = Promise.all(promises)
    return tagProfiles
  }

  async listTagsToProfileByProfile (profile_id: string) {
    return await this.find({ where: { profile_id }, relations: ['tag'] })
  }

  async insertOrDeleteTagsToProfilesInBulk (data: any[], profile_id: string): Promise<TagsToProfile[]> {
    const profileTagsToProfiles = await this.find({ where: { profile_id } })
    
    const divergents = profileTagsToProfiles.filter((profileTagsToProfile) => data.some(TagsToProfile => TagsToProfile.id !== profileTagsToProfile.id))
    await this.remove(data.length > 0 ? divergents : profileTagsToProfiles)
    const TagsToProfiles = await this.save(data.map((data) => ({ ...data, id: !!profileTagsToProfiles?.length ? data.id : v4(), profile_id })))
    return TagsToProfiles
  }
}