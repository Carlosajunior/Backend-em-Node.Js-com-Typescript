import { Test, TestingModule } from '@nestjs/testing'
import { ProfilesHistoryRepository } from '../repositories'
import { datatype } from 'faker'
import { GetProfileHistoryByIdService } from './get-profile-history-by-id.service'
import { mockProfilesHistoryRepository } from '../mocks'
import { mockProfileHistoryModel } from '../mocks/models/profile-history.model.mock'

describe('GetProfileHistoryByIdService', () => {
    let service: GetProfileHistoryByIdService
    let profilesHistoryRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetProfileHistoryByIdService,
                { provide: ProfilesHistoryRepository, useFactory: mockProfilesHistoryRepository },
            ]
        }).compile()

        service = module.get<GetProfileHistoryByIdService>(GetProfileHistoryByIdService)
        profilesHistoryRepository = module.get<ProfilesHistoryRepository>(ProfilesHistoryRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return profile history.', async () => {
        const profileHistories = [mockProfileHistoryModel()]
        profilesHistoryRepository.findByID = jest.fn().mockResolvedValue(profileHistories)
        const result = await service.get(datatype.string())
        expect(result).toEqual(profileHistories)
    });
})
