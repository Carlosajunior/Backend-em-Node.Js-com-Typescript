import { mockSearchDTO } from '@/modules/messages/mocks/dto/search.dto.mock';
import { mockCreateProfileDTO } from '@/modules/professional-profiles/profiles/mocks';
import { NotAcceptableException } from '@nestjs/common';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { internet } from 'faker';
import { mockElasticSearchResponse } from '../mocks/dto/elastic-search-response.mock';
import { ElasticService } from './elastic.service';

describe('ElasticService', () => {
  let service: ElasticService;
  let elasticsearchService: ElasticsearchService

  const mockedNode = internet.url();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ElasticsearchModule.register({ node: mockedNode })],
      providers: [ElasticService]
    }).compile();

    elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
    service = module.get<ElasticService>(ElasticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of profiles.', async () => {
    const searchDTO = mockSearchDTO()
    const searchResponse = mockElasticSearchResponse()
    Object.assign(searchDTO, { addtionalFilter: 'filter' })
    elasticsearchService.search = jest.fn().mockResolvedValue(searchResponse)

    const result = await service.searchProfile(searchDTO)
    expect(result).toEqual({
      page: searchDTO.page,
      results: [{ _score: 1, ...searchResponse.hits.hits[0]._source }],
      total_results_per_page: searchDTO.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(Number(1) / searchDTO.records_per_page)
    })
  })

  it('should throw an error at searchProfile.', async () => {
    const searchDTO = mockSearchDTO()
    Object.assign(searchDTO, { addtionalFilter: 'filter' })
    jest.spyOn(service, 'searchProfile').mockRejectedValueOnce(new NotAcceptableException())
    expect(service.searchProfile(searchDTO)).rejects.toThrowError()
  })

  it('should parse elastic search results.', async () => {
    const searchDTO = mockSearchDTO()
    const searchResponse: any = mockElasticSearchResponse()

    Object.assign(searchDTO, { addtionalFilter: 'filter' })

    const result = await service.parserElasticResult({
      ...searchResponse
    }, searchDTO.page, searchDTO.records_per_page)
    expect(result).toEqual({
      page: searchDTO.page,
      results: [{ _score: 1, ...searchResponse.hits.hits[0]._source }],
      total_results_per_page: searchDTO.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(Number(1) / searchDTO.records_per_page)
    })
  })

  it('Should return list of profiles.', async () => {
    const searchDTO = mockSearchDTO()
    const searchResponse = mockElasticSearchResponse()
    Object.assign(searchDTO, { addtionalFilter: 'filter' })
    elasticsearchService.search = jest.fn().mockResolvedValue(searchResponse)
    const result = await service.searchProfileCoditional(searchDTO, "conditional")
    expect(result).toEqual({
      page: searchDTO.page,
      results: [{ _score: 1, ...searchResponse.hits.hits[0]._source }],
      total_results_per_page: searchDTO.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(Number(1) / searchDTO.records_per_page)
    })
  })

  it("should list all profiles.", async () => {
    const searchResponse = mockElasticSearchResponse()
    const searchDTO = mockSearchDTO()
    elasticsearchService.search = jest.fn().mockResolvedValue(searchResponse)
    const result = await service.listAll({ ...searchDTO, fields: [''], index: '', query_filters: { filter: [], minimum_should_match: 1, must: [], must_not: [], should: [] } })
    expect(result).toEqual({
      page: searchDTO.page,
      results: [{ _score: 1, ...searchResponse.hits.hits[0]._source }],
      total_results_per_page: searchDTO.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(Number(1) / searchDTO.records_per_page)
    })
  })

  it('Should return a profile.', async () => {
    const searchResponse = mockElasticSearchResponse()
    const searchDTO = mockSearchDTO()
    elasticsearchService.search = jest.fn().mockResolvedValue(searchResponse)
    const result = await service.search({ ...searchDTO, fields: [''], index: '', query_filters: { filter: [], minimum_should_match: 1, must: [], must_not: [], should: [] } })
    expect(result).toEqual({
      page: searchDTO.page,
      results: [{ _score: 1, ...searchResponse.hits.hits[0]._source }],
      total_results_per_page: searchDTO.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(Number(1) / searchDTO.records_per_page)
    })
  })
});
