import { Test, TestingModule } from '@nestjs/testing';
import { mockConfigurationsRepository } from '../mocks/repositories/configurations.repository.mock';
import { ConfigurationsRepository } from '../repositories/configurations.repository';
import { ConfigurationsService } from './configurations.service';

describe('ConfigurationsService', () => {
  let service: ConfigurationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationsService,
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository }
      ],
    }).compile();

    service = module.get<ConfigurationsService>(ConfigurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
