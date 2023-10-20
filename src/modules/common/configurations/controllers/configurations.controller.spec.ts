import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationsService } from '../services/configurations.service';
import { mockConfigurationsRepository } from '../mocks/repositories/configurations.repository.mock';
import { ConfigurationsRepository } from '../repositories/configurations.repository';

describe('ConfigurationsController', () => {
  let controller: ConfigurationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationsController],
      providers: [ConfigurationsService,
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository }
      ],
    }).compile();

    controller = module.get<ConfigurationsController>(ConfigurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
