import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ChangeUserStatusService } from '../services/change-user-status.service';

@Controller('users/status')
@ApiTags('users')
export class UserStatusController {
  public constructor(private readonly changeUserStatus: ChangeUserStatusService) { }

  @Patch(':id')
  @HttpCode(201)
  @ApiParam({
    name: 'id',
    type: String,
    required: true
  })
  @Groups(AccessProfiles.ADMINISTRATOR)
  public async update(@Param('id') id: string) {
    try {
      await this.changeUserStatus.execute(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
