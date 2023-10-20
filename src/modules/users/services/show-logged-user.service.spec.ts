import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { LoggedUserMapper } from '../mappers/logged-user.mapper';
import { UserMapper } from '../mappers/user.mapper';
import { mockTokenPayload } from '../mocks/dto/token-payload.mock';
import { mockUserRepository } from '../mocks/repositories/user-repository.mock';
import { UserRepository } from '../repositories/user.repository';
import { ShowLoggedUserService } from './show-logged-user.service';

describe('ShowLoggedUserService', () => {
    let service: ShowLoggedUserService;
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowLoggedUserService,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        service = module.get<ShowLoggedUserService>(ShowLoggedUserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should return a user if is admin.", async () => {
        const user = new User()
        const tokenPayload = mockTokenPayload()
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        const result = await service.execute(tokenPayload)
        expect(result).toEqual(UserMapper.toMap(user))
    })

    it("should return a user if is not a admin.", async () => {
        const user = new User()
        const tokenPayload = mockTokenPayload()
        tokenPayload['cognito:groups'] = [AccessProfiles.RECRUITER]
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        const result = await service.execute(tokenPayload)
        expect(result).toEqual(LoggedUserMapper.toMap(user))
    })

})
