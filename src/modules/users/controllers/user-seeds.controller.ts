import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { Controller, HttpCode, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsersInBulkService } from '../services/create-users-in-bulk.service';

@Controller('user/seeds')
@ApiTags('user seeds')
export class UserSeedsController {
  public constructor(private readonly createUsersInBulk: CreateUsersInBulkService) { }

  @Post()
  @HttpCode(201)
  @Groups(AccessProfiles.ADMINISTRATOR)
  public async create() {
    try {
      await this.createUsersInBulk.execute();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
