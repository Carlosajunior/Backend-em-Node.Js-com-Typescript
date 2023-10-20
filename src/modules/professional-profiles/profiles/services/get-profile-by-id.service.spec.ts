import { Test, TestingModule } from '@nestjs/testing'
import { datatype } from 'faker'
import { mockProfilesRepository } from '../mocks'
import { ProfilesRepository } from '../repositories'
import { mockProfileModel } from '../mocks/models/profile.model.mock'
import { GetProfileByIdService } from './get-profile-by-id.service'

describe('GetProfileByIdService', () => {
    let service: GetProfileByIdService
    let profileRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetProfileByIdService,
                { provide: ProfilesRepository, useFactory: mockProfilesRepository }
            ]
        }).compile()

        service = module.get<GetProfileByIdService>(GetProfileByIdService)
        profileRepository = module.get<ProfilesRepository>(ProfilesRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return profile by id.', async () => {
        const profile = mockProfileModel()
        profileRepository.findProfileById = jest.fn().mockResolvedValue(profile)
        const result = await service.execute(datatype.string())
        expect(result).toEqual(profile)
    });
})
