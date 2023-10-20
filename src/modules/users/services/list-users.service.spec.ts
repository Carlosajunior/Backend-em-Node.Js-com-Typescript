import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { mockListUsersDTO } from '../mocks/dto/list-users.dto.mock';
import { mockUserRepository } from '../mocks/repositories/user-repository.mock';
import { UserRepository } from '../repositories/user.repository';
import { ListUsersService } from './list-users.service';

describe('ListUsersService', () => {
    let service: ListUsersService;
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListUsersService,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        service = module.get<ListUsersService>(ListUsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should return a list of users.", async () => {
        const user = new User()
        const listUsersDTO = mockListUsersDTO()
        userRepository.paginate = jest.fn().mockResolvedValue({
            page: listUsersDTO.page,
            results: [user]?.map((user) => UserMapper.toMap(user)),
            total_results_per_page: listUsersDTO.records_per_page,
            total_results: 1,
            total_pages: Math.ceil(1 / listUsersDTO.records_per_page)
        })
        const result = await service.execute(listUsersDTO)
        expect(result).toEqual({
            page: listUsersDTO.page,
            results: [user]?.map((user) => UserMapper.toMap(user)),
            total_results_per_page: listUsersDTO.records_per_page,
            total_results: 1,
            total_pages: Math.ceil(1 / listUsersDTO.records_per_page)
        })
    })

})
