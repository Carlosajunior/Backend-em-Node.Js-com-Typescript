import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProfileByIdService } from '../services/get-profile-by-id.service';

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class GetProfileByIdController {
  constructor(private readonly getProfileByIdService: GetProfileByIdService) { }

  @Get(':id')
  @Groups(
    AccessProfiles.ADMINISTRATIVE,
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async show(@Param('id') id: string) {
    try {
      return await this.getProfileByIdService.execute(id);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }
}
