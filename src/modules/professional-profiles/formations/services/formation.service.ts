import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories'
import { Injectable } from '@nestjs/common'
import { Formation } from '../entities'

@Injectable()
export class FormationService {
  constructor (
    private readonly formationsRepository: FormationsRepository
  ) {}

  async listAllProfileFormations (id: string): Promise<Formation[]> {
    return await this.formationsRepository.listFormationsByProfile(id)
  }

}
