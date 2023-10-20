import { Test, TestingModule } from '@nestjs/testing'
import { ObservationsRepository } from '../repositories'
import { datatype } from 'faker'
import { mockObservationsRepository } from '../mocks/repositories'
import { mockObservationModel } from '../mocks/models/observations.model.mock'
import { ObservationService } from './observation.service'

describe('ObservationService', () => {
    let service: ObservationService
    let observationsRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ObservationService,
                { provide: ObservationsRepository, useFactory: mockObservationsRepository }
            ]
        }).compile()

        service = module.get<ObservationService>(ObservationService)
        observationsRepository = module.get<ObservationsRepository>(ObservationsRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list profile observations.', async () => {
        const observations = [mockObservationModel()]
        observationsRepository.listObservationsByProfile = jest.fn().mockResolvedValue(observations)
        const result = await service.listAllProfileObservations(datatype.string())
        expect(result).toEqual(observations)
    });
})
