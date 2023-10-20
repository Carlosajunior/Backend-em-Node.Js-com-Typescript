import { Test, TestingModule } from '@nestjs/testing'
import { ExperiencesRepository } from '../repositories'
import { mockExperienceModel, mockExperiencesRepository } from '../mocks'
import { ExperienceService } from './experience.service'
import { datatype } from 'faker'

describe('ExperienceService', () => {
    let service: ExperienceService
    let experiencesRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExperienceService,
                { provide: ExperiencesRepository, useFactory: mockExperiencesRepository }
            ]
        }).compile()

        service = module.get<ExperienceService>(ExperienceService)
        experiencesRepository = module.get<ExperiencesRepository>(ExperiencesRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list profile experiences', async () => {
        const experiences = [mockExperienceModel()]
        experiencesRepository.listExperiencesByProfile = jest.fn().mockResolvedValue(experiences)
        const result = await service.listAllProfileExperiences(datatype.string())
        expect(result).toEqual(experiences)
    });

})
