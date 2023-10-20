import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories'
import { Injectable } from '@nestjs/common'
import { Experience } from '../entities'

@Injectable()
export class ExperienceService {
  constructor (
    private readonly experiencesRepository: ExperiencesRepository
  ) {}

  async listAllProfileExperiences (id: string): Promise<Experience[]> {
    return await this.experiencesRepository.listExperiencesByProfile(id)
  }
}
