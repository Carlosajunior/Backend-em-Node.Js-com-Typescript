import { Test, TestingModule } from '@nestjs/testing';
import AWS from 'aws-sdk';
import { datatype } from 'faker';
import { User } from '../entities/user.entity';
import { mockUserRepository } from '../mocks/repositories/user-repository.mock';
import { UserRepository } from '../repositories/user.repository';
import { ChangeUserStatusService } from './change-user-status.service';

describe('ChangeUserStatusService', () => {
    let service: ChangeUserStatusService;
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeUserStatusService,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        service = module.get<ChangeUserStatusService>(ChangeUserStatusService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should change user status.', async () => {
        const user = new User()
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        const cognitoIdentityServiceProvider = Object.getPrototypeOf(new AWS.CognitoIdentityServiceProvider());
        jest.spyOn(cognitoIdentityServiceProvider, 'adminDisableUser').mockReturnValue({
            promise: () => Promise.resolve(null),
        });
        jest.spyOn(cognitoIdentityServiceProvider, 'adminEnableUser').mockReturnValue({
            promise: () => Promise.resolve(null),
        });

        userRepository.update = jest.fn().mockResolvedValue({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
        const result = await service.execute(datatype.uuid())
        expect(result).toEqual({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
    })

})
