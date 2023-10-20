import { EntityRepository, Repository } from 'typeorm'

import { CreateOfficeDto, UpdateOfficeDto } from '@/modules/professional-profiles/offices/dto'
import { Office } from '@/modules/professional-profiles/offices/entities'

@EntityRepository(Office)
export class OfficesRepository extends Repository<Office> {
  async createOfficesInBulk (data: CreateOfficeDto[]): Promise<Office[]> {
    const promises = data.map(async office => {
      const createdOffice = this.create(office)
      return await this.save(createdOffice)
    })
    const offices = Promise.all(promises)
    return offices
  }

  async insertOrDeleteOfficesInBulk (data: UpdateOfficeDto[], experience_id: string): Promise<Office[]> {
    const experienceOffices = await this.find({ where: { experience_id } })
    const divergents = experienceOffices.filter((experienceOffice) => data.some(office => office.id !== experienceOffice.id))
    await this.remove(data.length > 0 ? divergents : experienceOffices)
    const offices = await this.save(data.map((data) => ({ ...data, experience_id })))
    return offices
  }
}
