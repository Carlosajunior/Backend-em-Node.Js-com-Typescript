import { Test, TestingModule } from '@nestjs/testing';
import { mockFunnelRepository } from '../../customers/mocks';
import { mockObservationsRepository } from '../../professional-profiles/observations/mocks/repositories';
import { ObservationsRepository } from '../../professional-profiles/observations/repositories';
import { mockUserRepository } from '../../users/mocks/repositories/user-repository.mock';
import { UserRepository } from '../../users/repositories/user.repository';
import { mockColumnsRepository } from '../columns/mocks';
import { ColumnsRepository } from '../columns/repositories';
import { FunnelService } from './funnel.service';
import { FunnelRepository } from '../repositories/funnel.repository';
import { mockCreateFunnelDTO } from '../mocks/dto/create-funnel.dto.mock';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { datatype } from 'faker';
import { User } from '@/modules/users/entities/user.entity';
import { mockFunnelModel } from '../columns/mocks/models/funnel.model.mock';
import { mockFindFunnelDTO } from '../mocks/dto/find-funnel.dto.mock';
import { mockUpdateFunnelDTO } from '../mocks/dto/update-funnel.dto.mock';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { FunnelConstants } from '../constants';

describe('FunnelService', () => {
  let service: FunnelService;
  let funnelRepository: any
  let userRepository: any
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FunnelService,
        { provide: FunnelRepository, useFactory: mockFunnelRepository },
        { provide: ColumnsRepository, useFactory: mockColumnsRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: ObservationsRepository, useFactory: mockObservationsRepository }
      ]
    }).compile();

    funnelRepository = module.get<FunnelRepository>(FunnelRepository)
    userRepository = module.get<UserRepository>(UserRepository)
    service = module.get<FunnelService>(FunnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a funnel.', async () => {
    const createFunnelDto = mockCreateFunnelDTO()
    const user = new User()
    const funnel = mockFunnelModel()
    RequestContext.currentUser = jest.fn().mockResolvedValue({
      name: datatype.string(),
      middle_name: datatype.string(),
      id: datatype.string(),
      email: datatype.string()
    })
    userRepository.findOne = jest.fn().mockResolvedValue(user)
    funnelRepository.createFunnel = jest.fn().mockResolvedValue(funnel)
    const result = await service.create(createFunnelDto)
    expect(result).toEqual(funnel)
  })

  it('should return a funnel.', async () => {
    const findFunnelDto = mockFindFunnelDTO()
    const funnels = [mockFunnelModel()]
    funnelRepository.findFunnels = jest.fn().mockResolvedValue({
      page: findFunnelDto.page,
      results: funnels,
      total_results_per_page: funnels.length,
      total_results: funnels.length,
      total_pages: Math.ceil(funnels.length / findFunnelDto.records_per_page)
    })
    const result = await service.list(findFunnelDto)
    expect(result).toEqual({
      page: findFunnelDto.page,
      results: funnels,
      total_results_per_page: funnels.length,
      total_results: funnels.length,
      total_pages: Math.ceil(funnels.length / findFunnelDto.records_per_page)
    })
  })

  it('should update a funnel.', async () => {
    const updateFunnelDto = mockUpdateFunnelDTO()
    const funnel = mockFunnelModel()
    const user = new User()
    funnelRepository.findOne = jest.fn().mockResolvedValue(funnel)
    RequestContext.currentUser = jest.fn().mockResolvedValue({ email: datatype.string() })
    userRepository.findOne = jest.fn().mockResolvedValue(user)
    funnelRepository.updateFunnel = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.update(datatype.string(), updateFunnelDto, [AccessProfiles.ADMINISTRATOR])
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
  })

  it('should update status of a funnel.', async () => {
    const funnel = mockFunnelModel()
    funnelRepository.findOne = jest.fn().mockResolvedValue(funnel)
    funnelRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.updateStatus(datatype.string(), FunnelConstants.Active)
    const expected = Object.assign(funnel, { status: FunnelConstants.Active })
    expect(result).toEqual({
      ...expected
    })
  })
});
