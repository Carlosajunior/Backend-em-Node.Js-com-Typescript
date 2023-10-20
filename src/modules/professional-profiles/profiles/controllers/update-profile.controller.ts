import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { FileRequest, UpdateProfileService } from '@/modules/professional-profiles/profiles/services';
import { BadRequestException, Body, Controller, HttpStatus, Param, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateProfileDTO } from '../dtos';
import { fileFilterHelper } from './helpers';

@Controller('professional-profiles')
@ApiTags('professional profile')
export class UpdateProfileController {
  constructor(private readonly updateProfileService: UpdateProfileService) { }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'disc2_result', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
        { name: 'quati_result', maxCount: 1 },
        { name: 'files' }
      ],
      {
        limits: { fileSize: 10485760 },
        fileFilter: fileFilterHelper
      }
    )
  )
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.RECRUITER,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: FileRequest,
    @Body() data: UpdateProfileDTO,
    @Res() res: Response
  ) {
    try {
      const profile = await this.updateProfileService.update(id, data, files);
      if (profile) {
        await this.updateProfileService.update_into_elastic(id);
      }
      return res.status(HttpStatus.ACCEPTED).send(profile);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
