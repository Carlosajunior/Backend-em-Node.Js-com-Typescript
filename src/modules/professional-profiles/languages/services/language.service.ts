import { Injectable } from '@nestjs/common'
import { Language } from '../entities'
import { LanguageRepository } from '../repositories'

@Injectable()
export class LanguageService {
  constructor (
    private readonly languagesRepository: LanguageRepository
  ) {}

  async listAllProfileLanguages (id: string): Promise<Language[]> {
    return await this.languagesRepository.listLanguagesByProfile(id)
  }
}
