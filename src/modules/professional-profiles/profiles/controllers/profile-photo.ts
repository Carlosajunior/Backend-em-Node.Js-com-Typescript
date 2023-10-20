import { BadRequestException, Body, Controller, Delete, NotAcceptableException, Param, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { multerPhotoOptions } from '../../../customers/helpers/multer.config';
import { DeleteAttachmentDTO } from '../../attachments/dtos';
import { ProfilePhotoDTO } from '../dtos/profile-photo.dto';
import { UpdateProfileService } from '../services';
import { ProfilePhotoService } from '../services/profile-photo.service';

@Controller('profile-photo')
@ApiTags("profile photo")
export class ProfilePhoto {
  uploadService: any;
  constructor(
    private readonly profilePhotoService: ProfilePhotoService,
    readonly updateProfileService: UpdateProfileService
  ) { }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo', multerPhotoOptions))
  async savePhoto(
    @Param() params: ProfilePhotoDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      const updated = await this.profilePhotoService.saveProfilePhoto(params, photo);
      await this.updateProfileService.update_into_elastic(params.id);
      return updated
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  @Delete()
  async deletePhoto(@Body() data: DeleteAttachmentDTO) {
    try {
      const updated = await this.profilePhotoService.deleteProfilePhoto(data.profile_id, data);
      await this.updateProfileService.update_into_elastic(data.profile_id);
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
