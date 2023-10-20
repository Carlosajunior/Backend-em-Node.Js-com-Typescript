import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateVacancyStatusDTO } from '../dtos/update-status.dto';
import { UpdateVacancyStatusService } from '../services/update-vacancy-status.service';

@Controller('vacancies')
@ApiTags('vacancies')
export class UpdateStatusVacancyController {
  constructor(private readonly updateVacancyStatus: UpdateVacancyStatusService) { }

  @Patch('status')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  @HttpCode(201)
  async update(@Body() data: UpdateVacancyStatusDTO) {
    try {
      await this.updateVacancyStatus.execute(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
