import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { mockCategoriesRepository } from '../mocks/repositories/categories.repository.mock';
import { CategoriesRepository } from '../repositories';
import { mockCategoriesModel } from '../mocks/models/categories.model.mock';
import { mockCategoriesFilterDTO } from '../mocks/dto/categories-filter.dto.mock';
import { mockSearchDTO } from '@/modules/messages/mocks/dto/search.dto.mock';
import { NotAcceptableException } from '@nestjs/common';


describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoriesRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService,
        { provide: CategoriesRepository, useFactory: mockCategoriesRepository }
      ],
    }).compile();

    categoriesRepository = module.get<CategoriesRepository>(CategoriesRepository)
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return categories.', async () => {
    const categories = [mockCategoriesModel()]
    const categoriesFilterDTO = mockCategoriesFilterDTO()
    const searchDTO = mockSearchDTO()
    categoriesRepository.findCategories = jest.fn().mockResolvedValue({
      results: categories,
      page: searchDTO.page,
      last_page: (searchDTO.page - 1) * searchDTO.records_per_page > 0 ? searchDTO.page - 1 : null,
      total_results_per_page: categories.length,
      total_results: 1,
      total_pages: Math.ceil(
        1 / (searchDTO.records_per_page ? searchDTO.records_per_page : 15)
      )
    })
    Object.assign(categoriesFilterDTO, searchDTO)
    const result = await service.list(categoriesFilterDTO)
    expect(result).toEqual({
      results: categories,
      page: searchDTO.page,
      last_page: (searchDTO.page - 1) * searchDTO.records_per_page > 0 ? searchDTO.page - 1 : null,
      total_results_per_page: categories.length,
      total_results: 1,
      total_pages: Math.ceil(
        1 / (searchDTO.records_per_page ? searchDTO.records_per_page : 15)
      )
    })
  })

  it('should throw an error at list.', async () => {
    const categoriesFilterDTO = mockCategoriesFilterDTO()
    const searchDTO = mockSearchDTO()
    Object.assign(categoriesFilterDTO, searchDTO)
    jest.spyOn(service, 'list').mockRejectedValueOnce(new NotAcceptableException())
    expect(service.list(categoriesFilterDTO)).rejects.toThrowError()
  })
});
