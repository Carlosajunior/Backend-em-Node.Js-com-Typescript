import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories'
import { ReferenceController } from './controllers'
import { ReferenceService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([ReferencesRepository])],
  controllers: [ReferenceController],
  providers: [ReferenceService]
})
export class ReferencesModule {}
