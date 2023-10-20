import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockConfigurationsRepository } from '../../configurations/mocks/repositories/configurations.repository.mock';
import { ConfigurationsRepository } from '../../configurations/repositories/configurations.repository';
import { mockTagsProfileRepository, mockTagsRepository } from '../mocks';
import { mockUpdateTagDTO } from '../mocks/dtos/update-tag.dto.mock';
import { TagsRepository, TagsToProfilesRepository } from '../repositories';
import { UpdateTagService } from './update-tag.service';

describe('UpdateTagService', () => {
  let updateTagService: UpdateTagService;
  let tagsRepository: any;
  let configurationsRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTagService,
        { provide: TagsRepository, useFactory: mockTagsRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        {
          provide: TagsToProfilesRepository,
          useFactory: mockTagsProfileRepository
        },
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository }
      ]
    }).compile();
    updateTagService = module.get<UpdateTagService>(UpdateTagService);
    tagsRepository = module.get<TagsRepository>(TagsRepository);
    configurationsRepository = module.get<ConfigurationsRepository>(ConfigurationsRepository)
  });

  describe('UpdateTag', () => {
    test('should update tag if data is correctly provided.', async () => {
      configurationsRepository.findOne.mockResolvedValue({ configuration: "90" })
      const tag = mockUpdateTagDTO();
      tagsRepository.updateTag.mockResolvedValue(tag);
      const id = datatype.string();
      await updateTagService.updateTag(id, tag);
      expect(tagsRepository.updateTag).toHaveBeenLastCalledWith(id, {
        name: tag.name,
        category: tag.category
      });
    });
  });
});
