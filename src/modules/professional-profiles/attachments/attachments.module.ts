import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories'
import { AttachmentController } from './controllers'
import { AttachmentService } from './services'
import { UploadService } from '@/modules/common/shared/services'

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentsRepository])],
  controllers: [AttachmentController],
  providers: [AttachmentService, UploadService]

})
export class AttachmentsModule {}
