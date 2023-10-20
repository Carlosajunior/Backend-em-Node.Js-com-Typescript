import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories'
import { Injectable } from '@nestjs/common'
import { SocialMedia } from '../entities'

@Injectable()
export class SocialMediaService {
  constructor (
    private readonly socialMediasRepository: SocialMediasRepository
  ) {}

  async listAllProfileSocialMedias (id: string): Promise<SocialMedia[]> {
    return await this.socialMediasRepository.listSocialMediasByProfile(id)
  }
}
