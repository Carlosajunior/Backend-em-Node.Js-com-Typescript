import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories'
import { Injectable } from '@nestjs/common'
import { Attachment } from '../entities'

@Injectable()
export class AttachmentService {
  constructor (
    private readonly attachmentsRepository: AttachmentsRepository
  ) {}

  async listAllProfileAttachments (id: string): Promise<Attachment[]> {
    return await this.attachmentsRepository.listAttachmentsByProfile(id)
  }

  async delete (id: string): Promise<void> {
    return await this.attachmentsRepository.deleteAttachments([id])
  }
}
