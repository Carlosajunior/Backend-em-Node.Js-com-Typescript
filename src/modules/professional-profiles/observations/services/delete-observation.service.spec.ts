import { Test, TestingModule } from '@nestjs/testing'
import { ObservationsRepository } from '../repositories'
import { datatype, internet } from 'faker'
import { mockObservationsRepository } from '../mocks/repositories'
import { mockObservationModel } from '../mocks/models/observations.model.mock'
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import { mockRequestCreateObservation } from '../mocks/dtos/save-observation-request.dto.mock'
import { mockVacancyModel } from '@/modules/vacancies/mocks/models/vacancy.model.mock'
import { mockProfileModel } from '../../profiles/mocks/models/profile.model.mock'
import { DeleteObservationService } from './delete-observation.service'

describe('DeleteObservationService', () => {
    let service: DeleteObservationService
    let observationsRepository: any
    let elasticsearchService: ElasticsearchService
    const mockedNode = internet.url();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ElasticsearchModule.register({ node: mockedNode })],
            providers: [
                DeleteObservationService,
                { provide: ObservationsRepository, useFactory: mockObservationsRepository }
            ]
        }).compile()

        elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
        service = module.get<DeleteObservationService>(DeleteObservationService)
        observationsRepository = module.get<ObservationsRepository>(ObservationsRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update observations to elastic.', async () => {
        const observations = [mockObservationModel()]
        observationsRepository.listObservationsByProfile = jest.fn().mockResolvedValue(observations)
        elasticsearchService.update = jest.fn().mockResolvedValue({
            "_shards": {
                "total": 0,
                "successful": 0,
                "failed": 0
            },
            "_index": "test",
            "_id": "1",
            "_version": 2,
            "_primary_term": 1,
            "_seq_no": 1,
            "result": "noop"
        })
        const result = await service.update_observations_into_elastic(datatype.string())
        expect(result).toEqual({
            "_shards": {
                "total": 0,
                "successful": 0,
                "failed": 0
            },
            "_index": "test",
            "_id": "1",
            "_version": 2,
            "_primary_term": 1,
            "_seq_no": 1,
            "result": "noop"
        })
    });

    it('should execute observation delete for profile.', async () => {
        const observation = mockObservationModel()
        const observations = [mockObservationModel()]
        observationsRepository.findOne = jest.fn().mockResolvedValue(observation)
        observationsRepository.remove = jest.fn().mockResolvedValue(observation)
        observationsRepository.listObservationsByProfile = jest.fn().mockResolvedValue(observations)
        elasticsearchService.update = jest.fn().mockResolvedValue({
            "_shards": {
                "total": 0,
                "successful": 0,
                "failed": 0
            },
            "_index": "test",
            "_id": "1",
            "_version": 2,
            "_primary_term": 1,
            "_seq_no": 1,
            "result": "noop"
        })
        const result = await service.execute(datatype.string())
        expect(result).toEqual({
            "_shards": {
                "total": 0,
                "successful": 0,
                "failed": 0
            },
            "_index": "test",
            "_id": "1",
            "_version": 2,
            "_primary_term": 1,
            "_seq_no": 1,
            "result": "noop"
        });
    });
})
