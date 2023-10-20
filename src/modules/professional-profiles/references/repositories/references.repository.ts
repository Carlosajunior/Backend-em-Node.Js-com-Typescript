import { EntityRepository, Repository } from 'typeorm'

import { CreateReferenceDTO, UpdateReferenceDTO } from '@/modules/professional-profiles/references/dtos'
import { Reference } from '@/modules/professional-profiles/references/entities'

@EntityRepository(Reference)
export class ReferencesRepository extends Repository<Reference> {
  async createReferencesInBulk (data: CreateReferenceDTO[]): Promise<Reference[]> {
    const promises = data.map(async reference => {
      const createdReference = this.create(reference)
      return await this.save(createdReference)
    })
    const references = Promise.all(promises)
    return references
  }

  async listReferencesByProfile (profile_id: string) {
    return await this.find({ where: { profile_id } })
  }
  

  async insertOrDeleteReferencesInBulk (data: UpdateReferenceDTO[], profile_id: string): Promise<Reference[]> {
    const profileReferences = await this.find({ where: { profile_id } })
    const divergents = profileReferences.filter((profileReference) => data.some(Reference => Reference.id !== profileReference.id))
    await this.remove(data.length > 0 ? divergents : profileReferences)
    const references = await this.save(data.map((data) => ({ ...data, profile_id })))
    return references
  }
}
