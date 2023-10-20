import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { SocialMediaService } from '../services'
@Controller('social-media')
@ApiTags("social media")
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) { }

  @Get('/profile/:id')
  async getProfileSocialMedias(@Param('id') id: string, @Res() res: Response) {
    try {
      const socialMedias = await this.socialMediaService.listAllProfileSocialMedias(id)
      return res.status(HttpStatus.OK).send(socialMedias)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
