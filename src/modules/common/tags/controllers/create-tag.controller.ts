import { CreateTagDTO } from '@/modules/common/tags/dtos';
import { CreateTagService } from '@/modules/common/tags/services';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Groups } from '../../auth/decorators/groups.decorator';
import { AccessProfiles } from '../../shared/constants/access-profiles';

@ApiTags('tags')
@Controller('tags')
export class CreateTagController {
  constructor(private readonly createTagService: CreateTagService) { }

  @Post()
  @Groups(AccessProfiles.ADMINISTRATOR)
  async handle(@Body() data: CreateTagDTO) {
    try {
      return this.createTagService.create(data);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
