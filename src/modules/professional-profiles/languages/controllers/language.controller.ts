import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { LanguageService } from '../services'

@Controller('language')
@ApiTags("language")
export class LanguageController {
  constructor(private readonly languageService: LanguageService) { }

  @Get('/profile/:id')
  async getProfileLanguages(@Param('id') id: string, @Res() res: Response) {
    try {
      const languages = await this.languageService.listAllProfileLanguages(id)
      return res.status(HttpStatus.OK).send(languages)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
