import { TagsToProfile } from '@/modules/common/tags/entities';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListTagsByProfileService } from '../services';

@ApiTags('tags')
@Controller('tag')
export class GetTagByProfile {
  constructor(private readonly listTagsByProfileService: ListTagsByProfileService) { }

  @Get('/profile/:id')
  async handle(@Param('id') id: string): Promise<TagsToProfile[]> {
    try {
      return this.listTagsByProfileService.list(id);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
