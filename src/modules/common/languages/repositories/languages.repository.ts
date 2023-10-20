import { createQueryBuilder, EntityRepository, Repository } from 'typeorm'
import { ListSearchModel } from '../../shared/models'
import { LanguageLevel } from '../constants'
import { CreateLanguageDTO } from '../dtos'
import { SearchLanguageDTO } from '../dtos/search-language.dto'
import { Languages } from '../entities'

@EntityRepository(Languages)
export class LanguagesRepository extends Repository<Languages> {
  // Consultar um idioma pelo UUID
  async findLangByIds (langIds: string[]): Promise<Languages[]> {
    const promises = langIds.map(
      async langId => await this.findOne(langId)
    )
    const getLangs = await Promise.all(promises)
    return getLangs.filter(lang => Boolean(lang))
  }

  // Consultar um idioma pelo nome e nível
  async findLangByName (language: string, level: LanguageLevel): Promise<Languages> {
    return await this.findOne({ language, level })
  }

  // Consultar um idioma pelo nome
  async findLangByTap (query: SearchLanguageDTO | undefined): Promise<ListSearchModel<Languages>> {
    const { records_limit, search } = query
    const condition =
    `Languages.language ilike '%${search}%'`
    const languages = await createQueryBuilder<Languages>('Languages')
      .where(condition)
      .take(records_limit)
      .getMany()
    const languagesCount = languages.length
    return {
      results: languages,
      search_limit: Math.ceil(records_limit),
      total_results: languagesCount
    }
  }

  // Criar um idioma
  async createLang (data: CreateLanguageDTO): Promise<Languages> {
    const createdLang = this.create(data)
    return await this.save(createdLang)
  }
}
