import { Test, TestingModule } from '@nestjs/testing';
import { UserMapper } from '../mappers/user.mapper';
import { mockTokenPayload } from '../mocks/dto/token-payload.mock';
import { mockUserRepository } from '../mocks/repositories/user-repository.mock';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserOnFirstAccessByTokenPayloadService } from './create-user-on-first-access-by-token-payload.service';

describe('CreateUserOnFirstAccessByTokenPayloadService', () => {
    let service: CreateUserOnFirstAccessByTokenPayloadService;
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserOnFirstAccessByTokenPayloadService,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        service = module.get<CreateUserOnFirstAccessByTokenPayloadService>(CreateUserOnFirstAccessByTokenPayloadService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create user on first access.', async () => {
        const tokenPayload = mockTokenPayload()
        const userDTO = UserMapper.fromTokenToDTO(tokenPayload);
        const userModel = UserModel.create(userDTO);
        userRepository.existsByEmail = jest.fn().mockResolvedValue(false)
        userRepository.create = jest.fn().mockResolvedValue(userModel)
        userRepository.save = jest.fn().mockResolvedValue(userModel)
        const result = await service.execute(tokenPayload)
        expect(result).toEqual(userModel)
    })

})
