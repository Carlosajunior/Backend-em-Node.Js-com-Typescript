import { mockCategoriesRepository } from '@/modules/categories/mocks/repositories/categories.repository.mock';
import { CategoriesRepository } from '@/modules/categories/repositories';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { internet } from 'faker';
import { ProfessionalProfileRepository } from '../repositories/professional-profile.repository';
import { ElasticService } from '../services/elastic.service';
import { GetLastestProfilesService } from '../services/get-lastest-profiles.service';
import { SearchProfileByParamsService } from '../services/search-profile-by-params.service';
import { SearchProfileByTextService } from '../services/search-profile-by-text.service';
import { SearchProfileService } from '../services/search-profile.service';
import { ElasticController } from './elastic.controller';

describe('ElasticController', () => {
  let controller: ElasticController;
  const mockedNode = internet.url();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ElasticsearchModule.register({ node: mockedNode })],
      controllers: [ElasticController],
      providers: [
        ElasticService,
        GetLastestProfilesService,
        ProfessionalProfileRepository,
        SearchProfileByParamsService,
        SearchProfileByTextService,
        SearchProfileService,
        { provide: CategoriesRepository, useFactory: mockCategoriesRepository }
      ]
    }).compile();

    controller = module.get<ElasticController>(ElasticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
