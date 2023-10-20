import { EntityRepository, Repository } from 'typeorm'

import { CreateFormationDTO, UpdateFormationDTO } from '@/modules/professional-profiles/formations/dtos'
import { Formation } from '@/modules/professional-profiles/formations/entities'

@EntityRepository(Formation)
export class FormationsRepository extends Repository<Formation> {
  async createFormationsInBulk (data: CreateFormationDTO[]): Promise<Formation[]> {
    const promises = data.map(async formation => {
      const createdFormation = this.create(formation)
      return await this.save(createdFormation)
    })
    const formations = Promise.all(promises)
    return formations
  }

  async listFormationsByProfile (profile_id: string) {
    return await this.find({ where: { profile_id } })
  }
  
  async insertOrDeleteFormationsInBulk (data: UpdateFormationDTO[], profile_id: string): Promise<Formation[]> {
    const profileFormations = await this.find({ where: { profile_id } })
    const divergents = profileFormations.filter((profileFormation) => data.some(Formation => Formation.id !== profileFormation.id))
    await this.remove(data.length > 0 ? divergents : profileFormations)
    const formations = await this.save(data.map((data) => ({ ...data, profile_id })))
    return formations
  }
}
