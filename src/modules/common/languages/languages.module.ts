import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LanguagesController } from './controllers'
import { LanguagesRepository } from './repositories'
import { LanguagesServices } from './services/languages.service'

@Module({
  imports: [TypeOrmModule.forFeature([LanguagesRepository])],
  controllers: [LanguagesController],
  providers: [LanguagesServices],
})
export class LanguagesModule {}
