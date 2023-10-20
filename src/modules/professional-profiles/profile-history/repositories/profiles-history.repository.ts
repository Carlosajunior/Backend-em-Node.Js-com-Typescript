import { EntityRepository, Repository } from 'typeorm'
import { CreateProfileHistoryDTO } from '../dtos'
import { ProfileHistory } from '../entities'

@EntityRepository(ProfileHistory)
export class ProfilesHistoryRepository extends Repository<ProfileHistory> {
  async createProfileHistory (data: CreateProfileHistoryDTO): Promise<ProfileHistory> {
    const profile = this.create(data)
    return this.save(profile)
  }

  async findByID (id: string): Promise<ProfileHistory[]> {
    return this.find({
      order: {
        created_at: 'ASC'
      },
      where: {
        entity_id: id
      }
    })
  }
}
