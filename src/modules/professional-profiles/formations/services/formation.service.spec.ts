import { Test, TestingModule } from '@nestjs/testing'
import { FormationsRepository } from '../repositories'
import { mockFormationModel, mockFormationsRepository } from '../mocks'
import { datatype } from 'faker'
import { FormationService } from './formation.service'

describe('FormationService', () => {
    let service: FormationService
    let formationsRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FormationService,
                { provide: FormationsRepository, useFactory: mockFormationsRepository }
            ]
        }).compile()

        service = module.get<FormationService>(FormationService)
        formationsRepository = module.get<FormationsRepository>(FormationsRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list profile formations', async () => {
        const formations = [mockFormationModel()]
        formationsRepository.listFormationsByProfile = jest.fn().mockResolvedValue(formations)
        const result = await service.listAllProfileFormations(datatype.string())
        expect(result).toEqual(formations)
    });

})
