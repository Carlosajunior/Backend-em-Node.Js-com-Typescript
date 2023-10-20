import { Injectable } from '@nestjs/common'

import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories'
import { GetProfileByEmailDTO } from '@/modules/professional-profiles/profiles/dtos'

@Injectable()
export class GetProfileByEmailService {
  constructor (
    private readonly profilesRepository: ProfilesRepository
  ) {}

  async get ({ email }: GetProfileByEmailDTO): Promise<boolean> {
    const existingProfile = await this.profilesRepository.findProfileByEmail(email)
    return Boolean(existingProfile)
  }
}
