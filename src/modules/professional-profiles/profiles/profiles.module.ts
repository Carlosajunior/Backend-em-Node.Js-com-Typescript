import { elasticsearchConfig } from '@/config/elasticseach';
import { AuditRepository } from '@/modules/audit/repositories';
import { ConfigurationsRepository } from '@/modules/common/configurations/repositories/configurations.repository';
import { UploadService } from '@/modules/common/shared/services';
import { TagsModule } from '@/modules/common/tags';
import {
  TagsRepository,
  TagsToProfilesRepository
} from '@/modules/common/tags/repositories';
import { TagUpdateService } from '@/modules/common/tags/tag-update/services/tag-update.service';
import { ColumnsRepository } from '@/modules/funnel/columns/repositories';
import { ImportsService } from '@/modules/imports/services/imports.service';
import { TransfromService } from '@/modules/imports/services/transform-service.service';
import { LogsImportsRepository } from '@/modules/logs-imports/repositories/logs-imports.repository';
import { AttachmentsModule } from '@/modules/professional-profiles/attachments';
import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories';
import { LanguagesModule } from '@/modules/professional-profiles/languages';
import { LanguageRepository } from '@/modules/professional-profiles/languages/repositories';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import {
  CreateProfileController,
  DeleteBehavioralProfileController,
  GetProfileByEmailController,
  GetProfileByIdController,
  UpdateProfileController
} from '@/modules/professional-profiles/profiles/controllers';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import {
  CheckByCpf,
  CreateProfileService,
  DeleteBehavioralProfileService,
  GetProfileByEmailService,
  UpdateProfileService
} from '@/modules/professional-profiles/profiles/services';
import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories';
import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '../address/repositories/address.repository';
import { OfficesRepository } from '../offices/repositories';
import { GetProfileByProfileIdController } from '../profile-history/controllers';
import { ProfilesHistoryRepository } from '../profile-history/repositories';
import { GetProfileHistoryByIdService } from '../profile-history/services';
import {
  AttachmentSubscriber,
  ExperienceSubscriber,
  FormationSubscriber,
  LanguageSubscriber,
  ObservationSubscriber,
  ProfileSubscriber,
  ReferenceSubscriber,
  SocialMediaSubscriber,
  TagsToProfileSubscriber
} from '../profile-history/subscribers';
import { CheckByCpfController } from './controllers/check-by-cpf.controller';
import { DeactivateProfileController } from './controllers/deactivate-profile.controller';
import { GetProfilesOnInterviewController } from './controllers/get-profile-on-interview.controller';
import { GetProfilePortalDeVagasController } from './controllers/get-profile-portal-vagas.controller';
import { ProfilePhoto } from './controllers/profile-photo';
import { ProfilesTagsRepository } from './profiles-tags/repositories/profiles-tags.repository';
import { DeactivateProfileService } from './services/deactive-profile.service';
import { GenerateService } from './services/generate.service';
import { GetProfileByIdService } from './services/get-profile-by-id.service';
import { GetProfilesOnInterviewService } from './services/get-profile-on-interview.service';
import { GetProfilesPortalDeVagasService } from './services/get-profile-portal-vagas.service';
import { ProfilePhotoService } from './services/profile-photo.service';

@Module({
  imports: [
    ElasticsearchModule.register(elasticsearchConfig),
    TypeOrmModule.forFeature([
      AttachmentsRepository,
      AuditRepository,
      ColumnsRepository,
      ConfigurationsRepository,
      ExperiencesRepository,
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
      TagsRepository,
      TagsToProfilesRepository,
      UserRepository,
      VacancyRepository,
      AddressRepository,
      LogsImportsRepository
    ]),
    AttachmentsModule,
    LanguagesModule,
    TagsModule
  ],
  controllers: [
    CheckByCpfController,
    CreateProfileController,
    DeleteBehavioralProfileController,
    GetProfileByEmailController,
    GetProfileByIdController,
    GetProfileByProfileIdController,
    ProfilePhoto,
    UpdateProfileController,
    GetProfilePortalDeVagasController,
    GetProfilesOnInterviewController,
    DeactivateProfileController
  ],
  providers: [
    AttachmentSubscriber,
    CheckByCpf,
    CreateProfileService,
    DeleteBehavioralProfileService,
    ExperienceSubscriber,
    FormationSubscriber,
    GenerateService,
    GetProfileByEmailService,
    GetProfileByIdService,
    GetProfileHistoryByIdService,
    LanguageSubscriber,
    ObservationSubscriber,
    ProfilePhotoService,
    ProfileSubscriber,
    ReferenceSubscriber,
    SocialMediaSubscriber,
    TagsToProfileSubscriber,
    UpdateProfileService,
    UploadService,
    TagUpdateService,
    ImportsService,
    TransfromService,
    GetProfilesPortalDeVagasService,
    GetProfilesOnInterviewService,
    DeactivateProfileService
  ]
})
export class ProfilesModule { }
