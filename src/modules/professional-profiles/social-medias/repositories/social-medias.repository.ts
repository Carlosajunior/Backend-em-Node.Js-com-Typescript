import { EntityRepository, Repository } from 'typeorm'

import { CreateSocialMediaDTO, UpdateSocialMediaDTO } from '@/modules/professional-profiles/social-medias/dtos'
import { SocialMedia } from '@/modules/professional-profiles/social-medias/entities'
@EntityRepository(SocialMedia)
export class SocialMediasRepository extends Repository<SocialMedia> {
  async createSocialMediasInBulk (data: CreateSocialMediaDTO[]): Promise<SocialMedia[]> {
    const promises = data.map(async socialMedia => {
      const createdSocialMedia = this.create(socialMedia)
      return await this.save(createdSocialMedia)
    })
    const socialMedias = Promise.all(promises)
    return socialMedias
  }

  async listSocialMediasByProfile (profile_id: string) {
    return await this.find({ where: { profile_id } })
  }

  async insertOrDeleteSocialMediasInBulk (data: UpdateSocialMediaDTO[], profile_id: string): Promise<SocialMedia[]> {
    const profileSocialMedias = await this.find({ where: { profile_id } })
    const divergents = profileSocialMedias.filter((profileSocialMedia) => data.some(SocialMedia => SocialMedia.id !== profileSocialMedia.id))
    await this.remove(data.length > 0 ? divergents : profileSocialMedias)
    const SocialMedias = await this.save(data.map((data) => ({ ...data, profile_id })))
    return SocialMedias
  }
}
