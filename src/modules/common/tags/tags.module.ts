import { AuditRepository } from '@/modules/audit/repositories';
import {
  CreateTagController,
  ListTagsController,
  UpdateTagProfileController
} from '@/modules/common/tags/controllers';
import {
  TagsRepository,
  TagsToProfilesRepository
} from '@/modules/common/tags/repositories';
import {
  CreateTagService,
  ListTagsByProfileService,
  ListTagsService,
  UpdateTagService
} from '@/modules/common/tags/services';
import { ColumnsRepository } from '@/modules/funnel/columns/repositories';
import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories';
import { LanguageRepository } from '@/modules/professional-profiles/languages/repositories';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { OfficesRepository } from '@/modules/professional-profiles/offices/repositories';
import { ProfilesHistoryRepository } from '@/modules/professional-profiles/profile-history/repositories';
import { ProfilesTagsRepository } from '@/modules/professional-profiles/profiles/profiles-tags/repositories/profiles-tags.repository';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { UpdateProfileService } from '@/modules/professional-profiles/profiles/services';
import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories';
import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationsRepository } from '../configurations/repositories/configurations.repository';
import { UploadService } from '../shared/services';
import { GetTagByProfile } from './controllers/get-tag-by-profile.controller';
import { TagUpdateModule } from './tag-update/tag-update.module';
import { TagUpdateService } from './tag-update/services/tag-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttachmentsRepository,
      AuditRepository,
      ColumnsRepository,
      ConfigurationsRepository,
      ExperiencesRepository,
      FormationsRepository,
      LanguageRepository,
      ObservationsRepository,
      OfficesRepository,
      ProfilesHistoryRepository,
      ProfilesRepository,
      ProfilesTagsRepository,
      ReferencesRepository,
      SocialMediasRepository,
      TagsRepository,
      TagsToProfilesRepository,
      UserRepository,
      VacancyRepository,
      ConfigurationsRepository
    ]),
    TagUpdateModule
  ],
  controllers: [
    CreateTagController,
    GetTagByProfile,
    ListTagsController,
    UpdateTagProfileController
  ],
  providers: [
    CreateTagService,
    ListTagsByProfileService,
    ListTagsService,
    TagUpdateService,
    UpdateProfileService,
    UpdateTagService,
    UploadService
  ],
  exports: [CreateTagService]
})
export class TagsModule { }
