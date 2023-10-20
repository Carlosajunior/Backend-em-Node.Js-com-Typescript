import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { mockUserRepository } from '../mocks/repositories/user-repository.mock';
import { UserRepository } from '../repositories/user.repository';
import { GetUserByIdService } from './get-user-by-id.service';

describe('GetUserByIdService', () => {
    let service: GetUserByIdService;
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUserByIdService,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        service = module.get<GetUserByIdService>(GetUserByIdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should return a user by it's id.", async () => {
        const user = new User()
        const userDTO = UserMapper.toMap(user);
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        const result = await service.execute(datatype.uuid())
        expect(result).toEqual(userDTO)
    })

})
