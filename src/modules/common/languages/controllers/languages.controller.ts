import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common'
import { CreateLanguageDTO } from '../dtos'
import { LanguagesServices } from '../services/languages.service'
import { Languages } from '../entities'
import { SearchLanguageDTO } from '../dtos/search-language.dto'
import { ListSearchModel } from '../../shared/models'
import { ApiTags } from '@nestjs/swagger'

@Controller('languages')
@ApiTags("languages")
export class LanguagesController {
  constructor(private readonly sanguagesServices: LanguagesServices) { }

  @Post()
  async createTag(@Body() data: CreateLanguageDTO): Promise<Languages> {
    try {
      return this.sanguagesServices.create(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  async handle(@Query() { records_limit, search }: SearchLanguageDTO): Promise<ListSearchModel<Languages>> {
    try {
      return this.sanguagesServices.list({ records_limit, search })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
