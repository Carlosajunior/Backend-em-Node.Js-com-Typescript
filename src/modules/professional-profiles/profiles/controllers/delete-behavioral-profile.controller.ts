import { UploadService } from '@/modules/common/shared/services'
import { DeleteBehavioralProfileDTO } from '@/modules/professional-profiles/profiles/dtos'
import { DeleteBehavioralProfileService } from '@/modules/professional-profiles/profiles/services'
import { BadRequestException, Body, Controller, Delete, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('professional-profile')
@ApiTags("professional profiles")
export class DeleteBehavioralProfileController {
  constructor(
    private readonly deleteBehavioralProfileService: DeleteBehavioralProfileService,
    private readonly uploadService: UploadService
  ) { }

  @Delete('behavioral-profile/:id')
  async deleteBehavioralProfile(@Param('id') id: string, @Body() data: DeleteBehavioralProfileDTO) {
    try {
      await this.uploadService.deleteFile(data.url.split('s3.amazonaws.com/')[1])
      return this.deleteBehavioralProfileService.delete(id, data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
