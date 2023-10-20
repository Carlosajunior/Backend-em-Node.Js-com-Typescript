import { RequestContext } from '@/modules/common/auth/middlewares';
import { User } from '@/modules/users/entities/user.entity';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { TemplateStatus } from '../constants/template-status.constant';
import { mockTemplateRepository } from '../mocks';
import { mockQueryParams } from '../mocks/dtos/query-params.dto.mock';
import { mockTemplateDTO } from '../mocks/dtos/template.dto.mock';
import { mockTemplateModel } from '../mocks/models/template.model.mock';
import { TemplateRepository } from '../repositories/template.repository';
import { TemplatesService } from './templates.service';

describe('TemplatesService', () => {
  let service: TemplatesService;
  let templatesRepository: any
  let userRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        { provide: TemplateRepository, useFactory: mockTemplateRepository },
        { provide: UserRepository, useFactory: mockUserRepository }
      ]
    }).compile();

    templatesRepository = module.get<TemplateRepository>(TemplateRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a template.', async () => {
    const template = mockTemplateModel()
    const user = new User()
    const templateDTO = mockTemplateDTO()
    RequestContext.currentUser = jest.fn().mockResolvedValue({
      name: datatype.string(),
      middle_name: datatype.string(),
      email: datatype.string()
    })
    userRepository.findOne = jest.fn().mockResolvedValue(user)
    templatesRepository.createTemplate = jest.fn().mockResolvedValue(template)
    const result = await service.create(templateDTO)
    expect(result).toEqual(template)
  })

  it('should update a template.', async () => {
    const templateDTO = mockTemplateDTO()
    templatesRepository.updateTemplate = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.update(datatype.string(), templateDTO)
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
  })

  it('should change template status.', async () => {
    const template = mockTemplateModel()
    templatesRepository.findOne = jest.fn().mockResolvedValue(template)
    templatesRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.changeStatus(datatype.string())
    expect(result).toEqual({
      ...template, ...{ active: !template.active, status: template.active ? TemplateStatus.INACTIVE : TemplateStatus.ACTIVE }
    })
  })

  it('should delete a template.', async () => {
    const template = mockTemplateModel()
    templatesRepository.findOne = jest.fn().mockResolvedValue(template)
    templatesRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.deleteTemplate(datatype.uuid())
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
  })

  it('should list templates.', async () => {
    const results = [mockTemplateModel()]
    const queryParams = mockQueryParams()
    templatesRepository.findTemplates = jest.fn().mockResolvedValue({
      page: queryParams.page,
      last_page: (queryParams.page - 1) * queryParams.records_per_page > 0 ? queryParams.page - 1 : 0,
      results: results,
      total_results_per_page: queryParams.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(1 / queryParams.records_per_page)
    })
    const result = await service.list(queryParams)
    expect(result).toEqual({
      page: queryParams.page,
      last_page: (queryParams.page - 1) * queryParams.records_per_page > 0 ? queryParams.page - 1 : 0,
      results: results,
      total_results_per_page: queryParams.records_per_page,
      total_results: 1,
      total_pages: Math.ceil(1 / queryParams.records_per_page)
    })
  })
});
