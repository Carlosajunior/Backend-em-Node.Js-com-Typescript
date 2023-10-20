import { RequestContext } from '@/modules/common/auth/middlewares';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { User } from '@/modules/users/entities/user.entity';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockListSquadMembersDTO } from '../mocks/dto/list-squad-members.dto.mock';
import { mockListSquadsDTO } from '../mocks/dto/list-squads-search.dto.mock';
import { mockUpdateSquadDTO } from '../mocks/dto/update-squad.dto.mock';
import { mockSquadModel } from '../mocks/models/squad.model.mock';
import { mockSquadRepository } from '../mocks/repositories/squad.repository.mock';
import { SquadRepository } from '../repositories/squad.repository';
import { SquadsService } from './squads.service';

describe('SquadsService', () => {
  let service: SquadsService;
  let squadRepository: any
  let usersRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SquadsService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: SquadRepository, useFactory: mockSquadRepository }
      ],
    }).compile();

    usersRepository = module.get<UserRepository>(UserRepository);
    squadRepository = module.get<SquadRepository>(SquadRepository);
    service = module.get<SquadsService>(SquadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return squads.', async () => {
    const listSquadsDTO = mockListSquadsDTO()
    const squads = [Object.assign(mockSquadModel(), { members_quantity: 2 })]
    squadRepository.find = jest.fn().mockResolvedValue(squads)
    usersRepository.count = jest.fn().mockResolvedValue(2)
    const result = await service.listSquadsSearch(listSquadsDTO)
    expect(result).toEqual({
      results: squads,
      page: listSquadsDTO.page,
      last_page: (listSquadsDTO.page - 1) * listSquadsDTO.records_per_page > 0 ? listSquadsDTO.page - 1 : null,
      total_results: squads.length,
      total_pages: Math.ceil(squads.length / (listSquadsDTO.records_per_page ? listSquadsDTO.records_per_page : 5))
    })
  })

  it('should update squad.', async () => {
    const updateSquadDTO = mockUpdateSquadDTO()
    usersRepository.count = jest.fn().mockResolvedValue(0)
    squadRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.updateSquad(updateSquadDTO)
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
  })

  it('should update squad.', async () => {
    const updateSquadDTO = mockUpdateSquadDTO()
    usersRepository.count = jest.fn().mockResolvedValue(0)
    squadRepository.update = jest.fn().mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
    const result = await service.updateSquad(updateSquadDTO)
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    })
  })

  it('should return squads.', async () => {
    const squads = [mockSquadModel()]
    squadRepository.find = jest.fn().mockResolvedValue(squads)
    const result = await service.listSquads()
    expect(result).toEqual(squads)
  })

});
