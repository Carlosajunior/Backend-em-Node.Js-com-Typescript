import { Test, TestingModule } from '@nestjs/testing';
import { PostJobInterviewService } from './post-job-interview.service';
import { PostJobInterviewRepository } from '../repositories/post-job-interview.repository';
import { mockPostJobInterviewRepository } from '../mocks/repositories/post-job-interview.repository.mock';
import { mockPostJobInterviewModel } from '../mocks/models/post-job-interview.model.mock';

describe('PostJobInterviewService', () => {
  let service: PostJobInterviewService;
  let postJobInterviewRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostJobInterviewService,
        {
          provide: PostJobInterviewRepository, useFactory: mockPostJobInterviewRepository
        }],
    }).compile();

    postJobInterviewRepository = module.get<PostJobInterviewRepository>(PostJobInterviewRepository)
    service = module.get<PostJobInterviewService>(PostJobInterviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list post job interview.', async () => {
    const postJobInterviewModel = mockPostJobInterviewModel()
    postJobInterviewRepository.findAll = jest.fn().mockResolvedValue(postJobInterviewModel)
    const result = await service.findAll()
    expect(result).toEqual(postJobInterviewModel)
  })
});
