import { mockConfigurationsRepository } from '@/modules/common/configurations/mocks/repositories/configurations.repository.mock';
import { ConfigurationsRepository } from '@/modules/common/configurations/repositories/configurations.repository';
import { UploadService } from '@/modules/common/shared/services';
import { mockTagsProfileRepository, mockTagsRepository } from '@/modules/common/tags/mocks';
import { mockTagModel } from '@/modules/common/tags/mocks/models';
import { TagsRepository, TagsToProfilesRepository } from '@/modules/common/tags/repositories';
import { TagUpdateService } from '@/modules/common/tags/tag-update/services/tag-update.service';
import { mockColumnsRepository } from '@/modules/funnel/columns/mocks';
import { ColumnsRepository } from '@/modules/funnel/columns/repositories';
import { ImportsService } from '@/modules/imports/services/imports.service';
import { TransfromService } from '@/modules/imports/services/transform-service.service';
import { mockLogsImportsRepository } from '@/modules/logs-imports/mocks/repositories/logs-imports.repository.mock';
import { LogsImportsRepository } from '@/modules/logs-imports/repositories/logs-imports.repository';
import { mockAttachmentsRepository } from '@/modules/professional-profiles/attachments/mocks';
import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories';
import { mockExperiencesRepository } from '@/modules/professional-profiles/experiences/mocks';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { mockFormationsRepository } from '@/modules/professional-profiles/formations/mocks';
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories';
import { mockLanguagesRepository } from '@/modules/professional-profiles/languages/mocks';
import { LanguageRepository } from '@/modules/professional-profiles/languages/repositories';
import { mockObservationsRepository } from '@/modules/professional-profiles/observations/mocks/repositories';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { mockProfilesHistoryRepository } from '@/modules/professional-profiles/profile-history/mocks/repositories/profile-history.repositories.mock';
import { ProfilesHistoryRepository } from '@/modules/professional-profiles/profile-history/repositories';
import { mockCreateProfileDTO, mockCreateSimpleProfileDTO, mockProfilesRepository } from '@/modules/professional-profiles/profiles/mocks';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { CreateProfileService } from '@/modules/professional-profiles/profiles/services';
import { GenerateService } from '@/modules/professional-profiles/profiles/services/generate.service';
import { mockReferencesRepository } from '@/modules/professional-profiles/references/mocks';
import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories';
import { mockSocialMediasRepository } from '@/modules/professional-profiles/social-medias/mocks';
import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { mockVacancyRepository } from '@/modules/vacancies/mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAddressRepository } from '../../address/mocks/repositories/address.repository.mock';
import { AddressRepository } from '../../address/repositories/address.repository';
import { mockOfficesRepository } from '../../offices/mocks/repositories/offices.repository.mock';
import { OfficesRepository } from '../../offices/repositories';
import { mockProfilesTagsRepository } from '../profiles-tags/mocks/repositories/profiles-tags.repository.mock';
import { ProfilesTagsRepository } from '../profiles-tags/repositories/profiles-tags.repository';

describe('CreateProfileService', () => {
  let createProfileService: CreateProfileService;
  let profilesRepository: any;
  let tagsRepository: any;
  let addressRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProfileService,
        GenerateService,
        UploadService,
        TagUpdateService,
        ImportsService,
        TransfromService,
        { provide: ProfilesRepository, useFactory: mockProfilesRepository },
        { provide: TagsRepository, useFactory: mockTagsRepository },
        { provide: TagsToProfilesRepository, useFactory: mockTagsProfileRepository },
        { provide: AttachmentsRepository, useFactory: mockAttachmentsRepository },
        { provide: ExperiencesRepository, useFactory: mockExperiencesRepository },
        { provide: FormationsRepository, useFactory: mockFormationsRepository },
        { provide: LanguageRepository, useFactory: mockLanguagesRepository },
        { provide: ReferencesRepository, useFactory: mockReferencesRepository },
        { provide: SocialMediasRepository, useFactory: mockSocialMediasRepository },
        { provide: ObservationsRepository, useFactory: mockObservationsRepository },
        { provide: ProfilesHistoryRepository, useFactory: mockProfilesHistoryRepository },
        { provide: ColumnsRepository, useFactory: mockColumnsRepository },
        { provide: VacancyRepository, useFactory: mockVacancyRepository },
        { provide: OfficesRepository, useFactory: mockOfficesRepository },
        { provide: ProfilesTagsRepository, useFactory: mockProfilesTagsRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: AddressRepository, useFactory: mockAddressRepository },
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository },
        { provide: LogsImportsRepository, useFactory: mockLogsImportsRepository }
      ]
    }).compile();

    createProfileService =
      module.get<CreateProfileService>(CreateProfileService);
    profilesRepository = module.get<ProfilesRepository>(ProfilesRepository);
    tagsRepository = module.get<TagsRepository>(TagsRepository);
    addressRepository = module.get<AddressRepository>(AddressRepository);
  });

  describe('CreateProfile', () => {
    test('should return ConflictException if profile already exists', async () => {
      const profile = mockCreateProfileDTO();
      profilesRepository.findProfileByEmail.mockResolvedValue(profile);
      const createPromise = createProfileService.execute({
        ...profile,
        files: null
      });

      expect(createPromise).rejects.toThrowError(ConflictException);
    });

    test('should return ConflictException if name and cpf already exists', async () => {
      const profile = mockCreateProfileDTO();
      profilesRepository.findProfileByNameAndCpf.mockResolvedValue(profile);
      const createPromise = createProfileService.execute({
        ...profile,
        files: null
      });

      expect(createPromise).rejects.toThrowError(ConflictException);
    });

    test('should call CreateProfile correct if profile does not exists and profile is complet', async () => {
      const profile = mockCreateProfileDTO();
      const tag = mockTagModel();
      addressRepository.save.mockResolvedValue({ "id": "teste", "city": "teste", "state": "teste" })
      Object.assign(profile, profile, { "address_id": "teste" })
      profilesRepository.findProfileByEmail.mockResolvedValue(undefined);
      profilesRepository.createProfile.mockResolvedValue(profile);
      tagsRepository.findTagsByIds.mockResolvedValue([tag]);
      await createProfileService.execute({ ...profile, files: null });

      expect(profilesRepository.createProfile).toHaveBeenCalledWith({
        ...profile,
        disc2_result: null,
        quati_result: null
      });
    });

    test('should call CreateProfile correct if profile does not exists and profile is simple', async () => {
      const profile = mockCreateSimpleProfileDTO();
      const tag = mockTagModel();
      profilesRepository.findProfileByEmail.mockResolvedValue(undefined);
      profilesRepository.createProfile.mockResolvedValue(profile);
      tagsRepository.findTagsByIds.mockResolvedValue([tag]);
      await createProfileService.execute({ ...profile, files: null });

      expect(profilesRepository.createProfile).toHaveBeenCalledWith({
        ...profile,
        disc2_result: null,
        quati_result: null
      });
    });
  });
});
