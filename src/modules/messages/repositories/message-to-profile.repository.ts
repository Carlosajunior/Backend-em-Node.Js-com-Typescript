import { EntityRepository, Repository } from 'typeorm'
import { MessagesToProfile } from '../entities/message-to-profile.entity'

@EntityRepository(MessagesToProfile)
export class MessagesToProfilesRepository extends Repository<MessagesToProfile> {
  async createMessagesToProfilesInBulk (data: any): Promise<MessagesToProfile[]> {
    const promises = data.map(async messageProfile => {
      const createdMessagesToProfile = this.create(messageProfile)
      return await this.save(createdMessagesToProfile)
    })
    const messageProfiles = Promise.all(promises)
    return messageProfiles
  }

  async createMessagesToProfile (data: MessagesToProfile): Promise<MessagesToProfile> {
    const createdMessagesToProfile = this.create(data)
    return await this.save(createdMessagesToProfile)
  }
}