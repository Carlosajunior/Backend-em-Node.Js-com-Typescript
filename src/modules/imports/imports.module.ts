import { Module } from '@nestjs/common';
import { ImportsService } from './services/imports.service';
import { ImportsController } from './controllers/imports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesRepository } from '../professional-profiles/profiles/repositories';
import { FormationsRepository } from '../professional-profiles/formations/repositories';
import { OfficesRepository } from '../professional-profiles/offices/repositories';
import { ExperiencesRepository } from '../professional-profiles/experiences/repositories';
import { ProfilesTagsRepository } from '../professional-profiles/profiles/profiles-tags/repositories/profiles-tags.repository';
import { TagsRepository, TagsToProfilesRepository } from '../common/tags/repositories';
import { LogsImportsRepository } from '../logs-imports/repositories/logs-imports.repository';
import { TransfromService } from './services/transform-service.service';
import { AddressRepository } from '../professional-profiles/address/repositories/address.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfilesRepository,
      FormationsRepository,
      OfficesRepository,
      ExperiencesRepository,
      ProfilesTagsRepository,
      TagsRepository,
      TagsToProfilesRepository,
      LogsImportsRepository,
      AddressRepository
    ])
  ],
  controllers: [ImportsController],
  providers: [ImportsService, TransfromService]
})
export class ImportsModule { }
