import { Test, TestingModule } from '@nestjs/testing'
import { datatype } from 'faker'
import { mockProfilesRepository } from '../mocks'
import { mockGetProfilePortalDeVagasDTO } from '../mocks/dtos/get-profile-portal-vagas.dto.mock'
import { mockProfileModel } from '../mocks/models/profile.model.mock'
import { ProfilesRepository } from '../repositories'
import { GetProfilesPortalDeVagasService } from './get-profile-portal-vagas.service'

describe('GetProfilesPortalDeVagasService', () => {
    let service: GetProfilesPortalDeVagasService
    let profileRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetProfilesPortalDeVagasService,
                { provide: ProfilesRepository, useFactory: mockProfilesRepository }
            ]
        }).compile()

        service = module.get<GetProfilesPortalDeVagasService>(GetProfilesPortalDeVagasService)
        profileRepository = module.get<ProfilesRepository>(ProfilesRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return profile by id.', async () => {
        const getProfilePortalDeVagasDTO = mockGetProfilePortalDeVagasDTO()
        const profiles = [mockProfileModel()]
        const profileCount = datatype.number()
        profileRepository.findAndCount = jest.fn().mockResolvedValue([
            profiles,
            profileCount
        ])
        const result = await service.GetProfilesPortalDeVagas(getProfilePortalDeVagasDTO)
        expect(result).toEqual({
            results: profiles,
            page: getProfilePortalDeVagasDTO.page,
            last_page: (getProfilePortalDeVagasDTO.page - 1) * getProfilePortalDeVagasDTO.records_per_page > 0 ? getProfilePortalDeVagasDTO.page - 1 : null,
            total_results: profileCount,
            total_pages: Math.ceil(profileCount / (getProfilePortalDeVagasDTO.records_per_page ? getProfilePortalDeVagasDTO.records_per_page : 15))
        })
    });
})
