import { CreateCognitoUserService } from '@/modules/common/cognito/services/create-cognito-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import AWS from 'aws-sdk';
import { datatype } from 'faker';
import { mockCreateUserDTO } from '../mocks/dto/create-user.dto.mock';
import { mockUserRepository } from '../mocks/repositories/user-repository.mock';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

describe('CreateCognitoUserService', () => {
    let service: CreateCognitoUserService;
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCognitoUserService,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        service = module.get<CreateCognitoUserService>(CreateCognitoUserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create user on first access.', async () => {
        // const createUserDTO = mockCreateUserDTO()
        // const userModel = UserModel.create(createUserDTO);
        // userRepository.existsByEmail = jest.fn().mockResolvedValue(false)
        // const cognitoIdentityServiceProvider = Object.getPrototypeOf(new AWS.CognitoIdentityServiceProvider());
        // jest.spyOn(cognitoIdentityServiceProvider, 'listUsers').mockReturnValue({
        //     promise: () => Promise.resolve({
        //         response: {
        //             data: {
        //                 Users: [{
        //                     Username: datatype.string(),
        //                     Attributes: [{
        //                         Name: datatype.string(),
        //                         Value: datatype.string()
        //                     }],
        //                     UserCreateDate: new Date(),
        //                     UserLastModifiedDate: new Date(),
        //                     Enabled: datatype.boolean(),
        //                     UserStatus: datatype.string(),
        //                     MFAOptions: [{
        //                         DeliveryMedium: datatype.string(),
        //                         AttributeName: datatype.string()
        //                     }]
        //                 }]
        //             }
        //         }
        //     }),
        // });
        // userRepository.create = jest.fn().mockResolvedValue(userModel)
        // jest.mock('typeorm', () => ({
        //     transaction: jest.fn()
        // }));
        // // userRepository.manager.transaction = jest.fn().mockImplementation((x) => {
        // //     x.save = jest.fn().mockResolvedValue(userModel)
        // // })

        // jest.spyOn(cognitoIdentityServiceProvider, 'adminCreateUser').mockReturnValue({
        //     promise: () => Promise.resolve({
        //         response: {
        //             data: {
        //                 User: {
        //                     Username: datatype.string(),
        //                     Attributes: [{
        //                         Name: datatype.string(),
        //                         Value: datatype.string()
        //                     }],
        //                     UserCreateDate: new Date(),
        //                     UserLastModifiedDate: new Date(),
        //                     Enabled: datatype.boolean(),
        //                     UserStatus: datatype.string(),
        //                     MFAOptions: [{
        //                         DeliveryMedium: datatype.string(),
        //                         AttributeName: datatype.string()
        //                     }]
        //                 }
        //             }
        //         }
        //     }),
        // });
        // jest.spyOn(cognitoIdentityServiceProvider, 'adminAddUserToGroup').mockReturnValue({
        //     promise: () => Promise.resolve({}),
        // });
        // const result = await service.execute(createUserDTO)
        // expect(result).toEqual(userModel)
    })

})