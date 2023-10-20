import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LanguageController } from './controllers'
import { LanguageRepository } from './repositories/languages.repository'
import { LanguageService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([LanguageRepository])],
  controllers: [LanguageController],
  providers: [LanguageService]
})
export class LanguagesModule {}
