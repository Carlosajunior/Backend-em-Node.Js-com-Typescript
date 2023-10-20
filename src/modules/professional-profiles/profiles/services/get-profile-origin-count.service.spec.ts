import { Test, TestingModule } from '@nestjs/testing'
import { datatype } from 'faker'
import { mockProfilesRepository } from '../mocks'
import { ProfilesRepository } from '../repositories'
import { GetProfileOriginCountService } from './get-profile-origin-count.service'

describe('GetProfileOriginCountService', () => {
    let service: GetProfileOriginCountService
    let profileRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetProfileOriginCountService,
                { provide: ProfilesRepository, useFactory: mockProfilesRepository }
            ]
        }).compile()

        service = module.get<GetProfileOriginCountService>(GetProfileOriginCountService)
        profileRepository = module.get<ProfilesRepository>(ProfilesRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return profile by id.', async () => {
        const cadastrosPortalDeVagas = datatype.number()
        const cadastrosUsuariosInternos = datatype.number()
        const cadastrosCrawlerLinkedin = datatype.number()
        profileRepository.countProfileOrigin = jest.fn().mockResolvedValue({
            cadastrosPortalDeVagas: cadastrosPortalDeVagas,
            cadastrosUsuariosInternos: cadastrosUsuariosInternos,
            cadastrosCrawlerLinkedin: cadastrosCrawlerLinkedin
        })
        const result = await service.getProfileOriginCount()
        expect(result).toEqual({
            cadastrosPortalDeVagas: cadastrosPortalDeVagas,
            cadastrosUsuariosInternos: cadastrosUsuariosInternos,
            cadastrosCrawlerLinkedin: cadastrosCrawlerLinkedin
        })
    });
})
