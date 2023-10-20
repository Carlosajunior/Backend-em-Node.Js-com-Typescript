import { mockExperiencesRepository } from '@/modules/professional-profiles/experiences/mocks';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { mockProfilesRepository } from '@/modules/professional-profiles/profiles/mocks';
import { mockProfilesTagsRepository } from '@/modules/professional-profiles/profiles/profiles-tags/mocks/repositories/profiles-tags.repository.mock';
import { ProfilesTagsRepository } from '@/modules/professional-profiles/profiles/profiles-tags/repositories/profiles-tags.repository';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockConfigurationsRepository } from '../../../configurations/mocks/repositories/configurations.repository.mock';
import { ConfigurationsRepository } from '../../../configurations/repositories/configurations.repository';
import { mockTagsRepository } from '../../mocks';
import { TagsRepository } from '../../repositories';
import { TagUpdateService } from './tag-update.service';
import * as leveshtein from 'fast-levenshtein'

describe('TagUpdateService', () => {
  let service: TagUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagUpdateService,
        { provide: ProfilesRepository, useFactory: mockProfilesRepository },
        { provide: TagsRepository, useFactory: mockTagsRepository },
        { provide: ExperiencesRepository, useFactory: mockExperiencesRepository },
        { provide: ProfilesTagsRepository, useFactory: mockProfilesTagsRepository },
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository }
      ],
    }).compile();

    service = module.get<TagUpdateService>(TagUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct match percentage.', () => {
    const string1 = datatype.string().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const string2 = datatype.string().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const comparisionPercentage = service.comparisionPercentage(string1, string2)
    100 - ((leveshtein.get(string1, string2)) * 100 / string2.length)
    expect(comparisionPercentage).toEqual(100 - ((leveshtein.get(string1, string2)) * 100 / string2.length))
  })
});
