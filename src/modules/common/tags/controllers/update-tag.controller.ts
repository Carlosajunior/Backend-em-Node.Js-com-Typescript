import { UpdateTagService } from '@/modules/common/tags/services';
import { UpdateProfileService } from '@/modules/professional-profiles/profiles/services';
import { BadRequestException, Body, Controller, HttpStatus, NotAcceptableException, Param, Patch, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { UpdateTagDTO } from '../dtos/update-tag.dto';

@ApiTags('tags')
@Controller('tags')
export class UpdateTagProfileController {
  constructor(
    private readonly updateTagService: UpdateTagService,
    private readonly updateProfileService: UpdateProfileService,
  ) { }

  @Patch('/spotlight/:id')
  async updateSpotligth(@Param('id') id: string, @Res() res: Response) {
    try {
      const tag = await this.updateTagService.changeTagsSpotlight(id);
      if (tag) {
        this.updateProfileService.update_into_elastic(tag.profile_id)
      }
      return res.status(HttpStatus.ACCEPTED).send(tag)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  @Patch('/approve/:id')
  async updateApproveTag(@Param('id') id: string, @Res() res: Response) {
    try {
      const tag = await this.updateTagService.changeTagsToAproveStatus(id);
      return res.status(HttpStatus.ACCEPTED).send(tag)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Patch(':id')
  async updateTag(@Param('id') id: string, @Body() data: UpdateTagDTO) {
    try {
      return this.updateTagService.updateTag(id, data)
    } catch (error) {
      return new NotAcceptableException(error)
    }
  }
}
