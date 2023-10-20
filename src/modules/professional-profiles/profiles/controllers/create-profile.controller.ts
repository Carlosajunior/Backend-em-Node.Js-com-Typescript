import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { fileFilterHelper } from '@/modules/professional-profiles/profiles/controllers/helpers';
import { CreateProfileDTO } from '@/modules/professional-profiles/profiles/dtos';
import { CreateProfileService, FileRequest, UpdateProfileService } from '@/modules/professional-profiles/profiles/services';
import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
@Controller('professional-profiles')
@ApiTags('professional profile')
export class CreateProfileController {
  constructor(
    private readonly createProfileService: CreateProfileService,
    private readonly updateProfileService: UpdateProfileService
  ) { }

  @Post()
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
  async create(
    @UploadedFiles() files: FileRequest,
    @Body() data: CreateProfileDTO,
    @Res() res: Response
  ) {
    try {
      const response = await this.createProfileService.execute({
        ...data,
        files
      });
      if (response) {
        await this.updateProfileService.update_into_elastic(response.id);
      }
      return res.status(HttpStatus.CREATED).send(response);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
