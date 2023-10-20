import { DeleteBehavioralProfileDTO } from '@/modules/professional-profiles/profiles/dtos'
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories/profiles.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteBehavioralProfileService {
  constructor (
    private readonly profilesRepository: ProfilesRepository
  ) {}

  async delete (id: string, data: DeleteBehavioralProfileDTO) {
    const updatedProfile = await this.profilesRepository.deleteBehavioralProfileFieldInfo(data.fieldname, id)
    return updatedProfile
  }
}
