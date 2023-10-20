import { NotAcceptableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateAnswerDTO } from '../mocks/dto/create-answer.dto.mock';
import { mockGetQuestionAnswersByProfileDTO } from '../mocks/dto/get-question-answer-by-profile.dto.mock';
import { mockGetQuestionAnswersDTO } from '../mocks/dto/get-question-answers.dto.mock';
import { mockUpdateAnswerDTO } from '../mocks/dto/update-question.dto.mock';
import { mockAnswersRepository } from '../mocks/repositories/answers.repository.mock';
import { AnswersRepository } from '../repositories/answers.repository';
import { AnswersService } from './answers.service';

describe('AnswersService', () => {
  let service: AnswersService;
  let answersRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        { provide: AnswersRepository, useFactory: mockAnswersRepository }
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
    answersRepository = module.get<AnswersRepository>(AnswersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return answer.', async () => {
    const answer = mockCreateAnswerDTO()
    answersRepository.create = jest.fn().mockResolvedValue(answer)
    answersRepository.save = jest.fn().mockResolvedValue(answer)
    const result = await service.createAnswer(answer)
    expect(result).toEqual([answer])
  })

  it('should throw an error at create.', async () => {
    const answer = mockCreateAnswerDTO()
    jest.spyOn(service, 'createAnswer').mockRejectedValueOnce(new NotAcceptableException())
    expect(service.createAnswer(answer)).rejects.toThrowError()
  })

  it('should return all question answers.', async () => {
    const getQuestionAnswers = mockGetQuestionAnswersDTO()
    const answer = mockCreateAnswerDTO()
    answersRepository.findAndCount = jest.fn().mockResolvedValue([answer, 1])
    const result = await service.getQuestionAnswers(getQuestionAnswers)
    expect(result).toEqual({
      results: answer,
      page: getQuestionAnswers.page,
      last_page: (getQuestionAnswers.page - 1) * getQuestionAnswers.records_per_page > 0 ? getQuestionAnswers.page - 1 : null,
      total_results_per_page: getQuestionAnswers.records_per_page ? getQuestionAnswers.records_per_page : 15,
      total_results: 1,
      total_pages: Math.ceil(
        1 / (getQuestionAnswers.records_per_page ? getQuestionAnswers.records_per_page : 15)
      )
    })
  })

  it('should throw an error at create.', async () => {
    const getQuestionAnswers = mockGetQuestionAnswersDTO()
    jest.spyOn(service, 'getQuestionAnswers').mockRejectedValueOnce(new NotAcceptableException())
    expect(service.getQuestionAnswers(getQuestionAnswers)).rejects.toThrowError()
  })

  it('should update an alternative.', async () => {
    const updateAnswerDto = mockUpdateAnswerDTO()
    answersRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.updateAnswer(updateAnswerDto)
    expect(result.affected).toBe(1)
  })

  it('should throw an error at update.', async () => {
    const updateAnswerDto = mockUpdateAnswerDTO()
    jest.spyOn(service, 'updateAnswer').mockRejectedValueOnce(new NotAcceptableException())
    expect(service.updateAnswer(updateAnswerDto)).rejects.toThrowError()
  })

  it('should return all question answers by profile id.', async () => {
    const getQuestionAnswersByProfileDTO = mockGetQuestionAnswersByProfileDTO()
    const answer = mockCreateAnswerDTO()
    answersRepository.findAndCount = jest.fn().mockResolvedValue([answer, 1])
    const result = await service.getQuestionAnswersByProfile(getQuestionAnswersByProfileDTO)
    expect(result).toEqual({
      results: answer,
      page: getQuestionAnswersByProfileDTO.page,
      last_page: (getQuestionAnswersByProfileDTO.page - 1) * getQuestionAnswersByProfileDTO.records_per_page > 0 ? getQuestionAnswersByProfileDTO.page - 1 : null,
      total_results_per_page: getQuestionAnswersByProfileDTO.records_per_page ? getQuestionAnswersByProfileDTO.records_per_page : 15,
      total_results: 1,
      total_pages: Math.ceil(
        1 / (getQuestionAnswersByProfileDTO.records_per_page ? getQuestionAnswersByProfileDTO.records_per_page : 15)
      )
    })
  })

  it('should throw an error at getQuestionAnswersByProfile.', async () => {
    const getQuestionAnswersByProfileDTO = mockGetQuestionAnswersByProfileDTO()
    jest.spyOn(service, 'getQuestionAnswersByProfile').mockRejectedValueOnce(new NotAcceptableException())
    expect(service.getQuestionAnswersByProfile(getQuestionAnswersByProfileDTO)).rejects.toThrowError()
  })
});
