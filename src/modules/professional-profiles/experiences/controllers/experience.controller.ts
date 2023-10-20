import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ExperienceService } from '../services'

@Controller('experience')
@ApiTags("experience")
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService,) { }

  @Get('/profile/:id')
  async getProfileExperiences(@Param('id') id: string, @Res() res: Response) {
    try {
      const experiences = await this.experienceService.listAllProfileExperiences(id)
      return res.status(HttpStatus.OK).send(experiences)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
