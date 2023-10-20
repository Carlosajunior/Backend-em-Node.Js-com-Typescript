import { Test, TestingModule } from '@nestjs/testing';
import { PreJobInterviewService } from './pre-job-interview.service';
import { PreJobInterviewRepository } from '../repositories/pre-job-interview.repository';
import { mockPreJobInterview } from '../mocks/repositories/pre-job-interview.repository.mock';
import { mockPreJobInterviewModel } from '../mocks/models/pre-job-interview.model';

describe('PreJobInterviewService', () => {
  let service: PreJobInterviewService;
  let preJobInterviewRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreJobInterviewService,
        {
          provide: PreJobInterviewRepository, useFactory: mockPreJobInterview
        }],
    }).compile();

    preJobInterviewRepository = module.get<PreJobInterviewRepository>(PreJobInterviewRepository);
    service = module.get<PreJobInterviewService>(PreJobInterviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list pre job interview.', async () => {
    const preJobInterviewModel = mockPreJobInterviewModel()
    preJobInterviewRepository.findAll = jest.fn().mockResolvedValue(preJobInterviewModel)
    const result = await service.findAll()
    expect(result).toEqual(preJobInterviewModel)
  })
});
