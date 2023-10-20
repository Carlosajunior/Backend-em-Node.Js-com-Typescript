import { Injectable, BadRequestException, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { LanguagesRepository } from '@/modules/common/languages/repositories'
import { CreateLanguageDTO } from '../dtos'
import { Languages } from '../entities'
import { SearchLanguageDTO } from '../dtos/search-language.dto'
import { ListSearchModel } from '../../shared/models'

@Injectable()
export class LanguagesServices {
  constructor(
    private readonly languagesRepository: LanguagesRepository
  ) { }

  async create(data: CreateLanguageDTO): Promise<Languages> {
    try {
      const findTagByName = await this.languagesRepository.findLangByName(data.language, data.level)
      if (findTagByName) {
        throw new BadRequestException('Language already exists')
      }
      return this.languagesRepository.createLang(data)
    } catch (error) {
      throw new NotAcceptableException(error)
    }

  }

  async list({ records_limit = 5, search = '' }: SearchLanguageDTO): Promise<ListSearchModel<Languages>> {
    try {
      return await this.languagesRepository.findLangByTap({ search, records_limit })
    } catch (error) {
      throw new NotFoundException(error)
    }

  }
}
