import { UploadService } from '@/modules/common/shared/services';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { DeleteAttachmentDTO } from '../../attachments/dtos';
import { ProfilePhotoDTO } from '../dtos/profile-photo.dto';
import { ProfilesRepository } from '../repositories';

@Injectable()
export class ProfilePhotoService {
  constructor(
    private readonly profileRepository: ProfilesRepository,
    private readonly uploadService: UploadService
  ) {}

  async saveProfilePhoto(data: ProfilePhotoDTO, photo: Express.Multer.File) {
    try {
      if (photo) {
        const uploadPhoto = await this.uploadService.uploadFile(photo, data.id);
        return await this.profileRepository.updateProfilePhoto(
          data.id,
          uploadPhoto.Location
        );
      }
      return new NotAcceptableException();
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async deleteProfilePhoto(id: string, data: DeleteAttachmentDTO) {
    try {
      await this.uploadService.deleteFile(data.name, data.profile_id);
      return await this.profileRepository.updateProfilePhoto(id, null);
    } catch (error) {
      return new NotFoundException(error);
    }
  }
}
