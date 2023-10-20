import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { FormationService } from '../services'

@Controller('formation')
@ApiTags("formation")
export class FormationController {
  constructor(private readonly formationService: FormationService,) { }

  @Get('/profile/:id')
  async getProfileFormations(@Param('id') id: string, @Res() res: Response) {
    try {
      const formations = await this.formationService.listAllProfileFormations(id)
      return res.status(HttpStatus.OK).send(formations)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
