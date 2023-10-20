import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ReferenceService } from '../services'

@Controller('reference')
@ApiTags("reference")
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService,) { }

  @Get('/profile/:id')
  async getProfileReferences(@Param('id') id: string, @Res() res: Response) {
    try {
      const references = await this.referenceService.listAllProfileReferences(id)
      return res.status(HttpStatus.OK).send(references)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
