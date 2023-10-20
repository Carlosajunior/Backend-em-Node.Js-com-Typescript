import { UploadService } from '@/modules/common/shared/services'
import { mockTagsProfileRepository, mockTagsRepository } from '@/modules/common/tags/mocks'
import { TagsRepository, TagsToProfilesRepository } from '@/modules/common/tags/repositories'
import { mockColumnsRepository } from '@/modules/funnel/columns/mocks'
import { ColumnsRepository } from '@/modules/funnel/columns/repositories'
import { mockAttachmentsRepository } from '@/modules/professional-profiles/attachments/mocks'
import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories'
import { mockExperiencesRepository } from '@/modules/professional-profiles/experiences/mocks'
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories'
import { mockFormationsRepository } from '@/modules/professional-profiles/formations/mocks'
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories'
import { mockLanguagesRepository } from '@/modules/professional-profiles/languages/mocks'
import { LanguageRepository } from '@/modules/professional-profiles/languages/repositories'
import { mockObservationsRepository } from '@/modules/professional-profiles/observations/mocks/repositories'
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories'
import { mockProfilesRepository, mockUpdateProfileDTO } from '@/modules/professional-profiles/profiles/mocks'
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories'
import { UpdateProfileService } from '@/modules/professional-profiles/profiles/services'
import { mockReferencesRepository } from '@/modules/professional-profiles/references/mocks'
import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories'
import { mockSocialMediasRepository } from '@/modules/professional-profiles/social-medias/mocks'
import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories'
import { Test, TestingModule } from '@nestjs/testing'
import { mockConfigurationsRepository } from '@/modules/common/configurations/mocks/repositories/configurations.repository.mock'
import { ConfigurationsRepository } from '@/modules/common/configurations/repositories/configurations.repository'
import { TagUpdateService } from '@/modules/common/tags/tag-update/services/tag-update.service'
import { mockVacancyRepository } from '@/modules/vacancies/mocks/repositories/vacancy.repository.mock'
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository'
import { datatype } from 'faker'
import { mockOfficesRepository } from '../../offices/mocks/repositories/offices.repository.mock'
import { OfficesRepository } from '../../offices/repositories'
import { mockProfilesTagsRepository } from '../profiles-tags/mocks/repositories/profiles-tags.repository.mock'
import { ProfilesTagsRepository } from '../profiles-tags/repositories/profiles-tags.repository'

describe('UpdateProfileService', () => {
  let updateProfileService: UpdateProfileService;
  let profilesRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProfileService,
        UploadService,
        TagUpdateService,
        { provide: ProfilesRepository, useFactory: mockProfilesRepository },
        { provide: TagsRepository, useFactory: mockTagsRepository },
        {
          provide: TagsToProfilesRepository,
          useFactory: mockTagsProfileRepository
        },
        {
          provide: AttachmentsRepository,
          useFactory: mockAttachmentsRepository
        },
        {
          provide: ExperiencesRepository,
          useFactory: mockExperiencesRepository
        },
        { provide: FormationsRepository, useFactory: mockFormationsRepository },
        { provide: LanguageRepository, useFactory: mockLanguagesRepository },
        { provide: ReferencesRepository, useFactory: mockReferencesRepository },
        {
          provide: SocialMediasRepository,
          useFactory: mockSocialMediasRepository
        },
        { provide: ColumnsRepository, useFactory: mockColumnsRepository },
        { provide: ObservationsRepository, useFactory: mockObservationsRepository },
        { provide: VacancyRepository, useFactory: mockVacancyRepository },
        { provide: OfficesRepository, useFactory: mockOfficesRepository },
        { provide: ProfilesTagsRepository, useFactory: mockProfilesTagsRepository },
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository }
      ]
    }).compile();

    updateProfileService =
      module.get<UpdateProfileService>(UpdateProfileService);
    profilesRepository = module.get<ProfilesRepository>(ProfilesRepository);
  });

  describe('UpdateProfile', () => {
    test('should return undefined if profile dont exists', async () => {
      const profile = mockUpdateProfileDTO();
      const id = datatype.string();
      const updatePromise = await updateProfileService.update(
        id,
        profile,
        undefined
      );

      expect(updatePromise.experiences).toBeFalsy();
    });

    test('should call UpdateProfile correct if profile data is provided', async () => {
      const profile = mockUpdateProfileDTO();
      Object.assign(profile, (profile['experiences'] = undefined));
      Object.assign(profile, (profile['formations'] = undefined));
      Object.assign(profile, (profile['languages'] = undefined));
      Object.assign(profile, (profile['references'] = undefined));
      Object.assign(profile, (profile['social_medias'] = undefined));
      profilesRepository.findOne.mockResolvedValue(profile);
      const id = datatype.string();
      const retorno = await updateProfileService.update(id, profile, undefined);
      delete retorno.attachments;
      delete retorno.tags;
      delete retorno.observations;
      expect(retorno).toEqual(profile);
    });
  });
});
