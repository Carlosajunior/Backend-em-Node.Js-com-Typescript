import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories'
import { Injectable } from '@nestjs/common'
import { Reference } from '../entities'

@Injectable()
export class ReferenceService {
  constructor (
    private readonly referencesRepository: ReferencesRepository
  ) {}

  async listAllProfileReferences (id: string): Promise<Reference[]> {
    return await this.referencesRepository.listReferencesByProfile(id)
  }
}
