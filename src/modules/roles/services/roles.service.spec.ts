import { RequestContext } from '@/modules/common/auth/middlewares';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { User } from '@/modules/users/entities/user.entity';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockGetRolesDTO } from '../mocks/dto/get-roles.dto.mock';
import { mockRolesModel } from '../mocks/models/roles.model.mock';
import { mockRolesRepository } from '../mocks/repositories/roles.repository.mock';
import { RolesRepository } from '../repositories/roles.repository';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;
  let rolesRepository: any
  let usersRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: RolesRepository, useFactory: mockRolesRepository }
      ],
    }).compile();

    usersRepository = module.get<UserRepository>(UserRepository);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list roles if administrator.', async () => {
    const getRolesDTO = mockGetRolesDTO()
    const role = mockRolesModel()
    rolesRepository.listRoles = jest.fn().mockResolvedValue(role)
    const result = await service.listRoles(getRolesDTO, [AccessProfiles.ADMINISTRATOR])
    expect(result).toEqual(role)
  })

  it('should list roles if not administrator.', async () => {
    const getRolesDTO = mockGetRolesDTO()
    const role = mockRolesModel()
    const user = new User()
    rolesRepository.findRole = jest.fn().mockResolvedValue(role)
    usersRepository.findOne = jest.fn().mockResolvedValue(user)
    RequestContext.currentUser = jest.fn().mockResolvedValue({ email: datatype.string() })
    const result = await service.listRoles(getRolesDTO, [AccessProfiles.RECRUITER])
    expect(result).toEqual(role)
  })
});
