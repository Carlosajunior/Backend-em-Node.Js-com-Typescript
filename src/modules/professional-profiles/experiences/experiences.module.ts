import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories'
import { ExperienceController } from './controllers'
import { ExperienceService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([ExperiencesRepository])],
  controllers: [ExperienceController],
  providers: [ExperienceService]
})
export class ExperiencesModule {}
