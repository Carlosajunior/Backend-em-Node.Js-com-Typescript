import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListUsersGroupsService } from '../services/list-users-groups.service';

@Controller('groups')
@ApiTags('users groups')
export class UserGroupsController {
  public constructor(private readonly listUsersGroupsService: ListUsersGroupsService) { }

  @Get()
  @Groups(AccessProfiles.ADMINISTRATOR)
  @HttpCode(200)
  public async index() {
    try {
      return this.listUsersGroupsService.execute();
    } catch (error) {
      throw new BadRequestException(error)
    }

  }
}
