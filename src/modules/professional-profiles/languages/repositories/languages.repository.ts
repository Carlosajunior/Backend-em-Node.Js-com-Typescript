import { EntityRepository, Repository } from 'typeorm'

import { CreateLanguageDTO, UpdateLanguageDTO } from '@/modules/professional-profiles/languages/dtos'
import { Language } from '@/modules/professional-profiles/languages/entities'

@EntityRepository(Language)
export class LanguageRepository extends Repository<Language> {
  async createLanguagesInBulk (data: CreateLanguageDTO[]): Promise<Language[]> {
    const promises = data.map(async language => {
      const createdLanguage = this.create(language)
      return await this.save(createdLanguage)
    })
    const languages = Promise.all(promises)
    return languages
  }


  async listLanguagesByProfile (profile_id: string) {
    return await this.find({ where: { profile_id } })
  }

  async insertOrDeleteLanguagesInBulk (data: UpdateLanguageDTO[], profile_id: string): Promise<Language[]> {
    const profileLanguages = await this.find({ where: { profile_id } })
    const divergents = profileLanguages.filter((profileLanguage) => data.some(Language => Language.id !== profileLanguage.id))
    await this.remove(data.length > 0 ? divergents : profileLanguages)
    const languages = await this.save(data.map((data) => ({ ...data, profile_id })))
    return languages
  }
}
