import { mockAlternativeModel } from '@/modules/alternatives/mocks/models/alternative.model.mock';
import { mockAlternativesRepository } from '@/modules/alternatives/mocks/repositories/alternatives.repository.mock';
import { AlternativesRepository } from '@/modules/alternatives/repositories/alternatives.repository';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockCreateQuestionDTO } from '../mocks/dto/create-question.dto.mock';
import { mockGetQuestionDTO } from '../mocks/dto/get-question.dto.mock';
import { mockListQuestionsDTO } from '../mocks/dto/list-questions.dto.mock';
import { mockUpdateQuestionDTO } from '../mocks/dto/update-question.dto.mock';
import { mockQuestionsModel } from '../mocks/models/questions.model.mock';
import { mockQuestionsRepository } from '../mocks/repositories/questions.repository.mock';
import { QuestionsRepository } from '../repositories/questions.repository';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let questionsRepository: any
  let alternativesRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        { provide: QuestionsRepository, useFactory: mockQuestionsRepository },
        { provide: AlternativesRepository, useFactory: mockAlternativesRepository }
      ],
    }).compile();

    alternativesRepository = module.get<AlternativesRepository>(AlternativesRepository);
    questionsRepository = module.get<QuestionsRepository>(QuestionsRepository);
    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a question.', async () => {
    const question = mockQuestionsModel()
    const alternative = mockAlternativeModel()
    const createQuestionDTO = mockCreateQuestionDTO()
    questionsRepository.create = jest.fn().mockResolvedValue(question)
    questionsRepository.save = jest.fn().mockResolvedValue(question)
    alternativesRepository.create = jest.fn().mockResolvedValue(alternative)
    alternativesRepository.save = jest.fn().mockResolvedValue(alternative)
    const result = await service.createQuestion(createQuestionDTO)
    expect(result).toEqual(question)
  })

  it('should list questions.', async () => {
    const listQuestionsDTO = mockListQuestionsDTO()
    const questions = [mockQuestionsModel()]
    questionsRepository.findAndCount = jest.fn().mockResolvedValue([questions, 1])
    const result = await service.listQuestions(listQuestionsDTO)
    expect(result).toEqual({
      results: questions,
      page: listQuestionsDTO.page,
      last_page: (listQuestionsDTO.page - 1) * listQuestionsDTO.records_per_page > 0 ? listQuestionsDTO.page - 1 : null,
      total_results: 1,
      total_pages: Math.ceil(1 / (listQuestionsDTO.records_per_page ? listQuestionsDTO.records_per_page : 15))
    })
  })

  it('should return a question.', async () => {
    const question = mockQuestionsModel()
    const alternative = mockAlternativeModel()
    Object.assign(question, { alternatives: alternative })
    const getQuestionDTO = mockGetQuestionDTO()
    questionsRepository.findOne = jest.fn().mockResolvedValue(question)
    const result = await service.getQuestion(getQuestionDTO)
    expect(result).toEqual(question)
  })

  it('should update a question.', async () => {
    RequestContext.currentUser = jest.fn().mockResolvedValue({
      name: datatype.string(),
      middle_name: datatype.string()
    })
    const updateQuestionDTO = mockUpdateQuestionDTO()
    questionsRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.updateQuestion(updateQuestionDTO)
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
  })
});
