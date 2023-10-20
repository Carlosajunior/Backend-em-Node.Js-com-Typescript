import { Injectable, NotFoundException } from '@nestjs/common'
import { ProfileHistory } from '../entities'
import { ProfilesHistoryRepository } from '../repositories'

@Injectable()
export class GetProfileHistoryByIdService {
  constructor(private readonly profilesHistoryRepository: ProfilesHistoryRepository) { }

  async get(id: string): Promise<ProfileHistory[]> {
    try {
      return await this.profilesHistoryRepository.findByID(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
