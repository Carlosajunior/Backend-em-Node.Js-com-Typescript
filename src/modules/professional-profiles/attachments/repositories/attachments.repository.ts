import { EntityRepository, Repository } from 'typeorm'

import { CreateAttachmentDTO, UpdateAttachmentDTO } from '@/modules/professional-profiles/attachments/dtos'
import { Attachment } from '@/modules/professional-profiles/attachments/entities'

@EntityRepository(Attachment)
export class AttachmentsRepository extends Repository<Attachment> {
  async createAttachmentsInBulk (data: CreateAttachmentDTO[]): Promise<Attachment[]> {
    const promises = data.map(async attachment => {
      const createdAttachment = this.create(attachment)
      return await this.save(createdAttachment)
    })
    const attachments = Promise.all(promises)
    return attachments
  }

  async insertAttachmentsInBulk (data: UpdateAttachmentDTO[], profile_id: string): Promise<Attachment[]> {
    const attachments = await this.save(data.map((data) => ({ ...data, profile_id })))
    return attachments
  }

  async listAttachmentsByProfile (profile_id: string) {
    return await this.find({ where: { profile_id } })
  }

  async deleteAttachments (ids: string[]): Promise<void> {
    await this.delete(ids)
  }
}
