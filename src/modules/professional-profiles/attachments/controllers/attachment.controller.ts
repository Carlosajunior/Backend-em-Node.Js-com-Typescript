import { UploadService } from '@/modules/common/shared/services'
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { DeleteAttachmentDTO } from '../dtos'
import { AttachmentService } from '../services'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@Controller('attachment')
@ApiTags("attachment")
export class AttachmentController {
  constructor(
    private readonly attachmentService: AttachmentService,
    private readonly uploadService: UploadService
  ) { }

  @Get('/profile/:id')
  async getProfileAttachments(@Param('id') id: string, @Res() res: Response) {
    try {
      const attachments = await this.attachmentService.listAllProfileAttachments(id)
      return res.status(HttpStatus.OK).send(attachments)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Delete(':id')
  async deleteAttachment(@Param('id') id: string, @Body() data: DeleteAttachmentDTO) {
    try {
      await this.uploadService.deleteFile(data.name, data.profile_id)
      return this.attachmentService.delete(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
