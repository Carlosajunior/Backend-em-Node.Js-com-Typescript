import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories'
import { GetProfileBySearchController } from './controllers'
import { GetSearchProfilesService } from './services'
import { SearchProfilesRepository } from './repositories'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfilesRepository,
      SearchProfilesRepository
    ])
  ],
  controllers: [GetProfileBySearchController],
  providers: [GetSearchProfilesService]
})
export class SearchProfilesModule {}
