import { Test, TestingModule } from '@nestjs/testing'
import { ObservationsRepository } from '../repositories'
import { datatype, internet } from 'faker'
import { CreateObservationService } from './create-observation.service'
import { mockObservationsRepository } from '../mocks/repositories'
import { mockProfilesRepository } from '../../profiles/mocks'
import { ProfilesRepository } from '../../profiles/repositories'
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository'
import { mockVacancyRepository } from '@/modules/vacancies/mocks/repositories/vacancy.repository.mock'
import { mockObservationModel } from '../mocks/models/observations.model.mock'
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import { mockRequestCreateObservation } from '../mocks/dtos/save-observation-request.dto.mock'
import { mockVacancyModel } from '@/modules/vacancies/mocks/models/vacancy.model.mock'
import { mockProfileModel } from '../../profiles/mocks/models/profile.model.mock'

describe('CreateObservationService', () => {
    let service: CreateObservationService
    let observationsRepository: any
    let professionalProfileRepository: any
    let vacancyRepository: any
    let elasticsearchService: ElasticsearchService
    const mockedNode = internet.url();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ElasticsearchModule.register({ node: mockedNode })],
            providers: [
                CreateObservationService,
                { provide: ObservationsRepository, useFactory: mockObservationsRepository },
                { provide: ProfilesRepository, useFactory: mockProfilesRepository },
                { provide: VacancyRepository, useFactory: mockVacancyRepository }
            ]
        }).compile()

        elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
        service = module.get<CreateObservationService>(CreateObservationService)
        observationsRepository = module.get<ObservationsRepository>(ObservationsRepository)
        professionalProfileRepository = module.get<ProfilesRepository>(ProfilesRepository)
        vacancyRepository = module.get<VacancyRepository>(VacancyRepository)
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

    it('should execute observation creation for profile.', async () => {
        const createObservationRequestDTO = mockRequestCreateObservation()
        const vacancy = mockVacancyModel()
        const profile = mockProfileModel()
        const observation = mockObservationModel()
        const observations = [mockObservationModel()]
        observationsRepository.existsByProfileIdAndVacancyId = jest.fn().mockResolvedValue(null)
        vacancyRepository.findOne = jest.fn().mockResolvedValue(vacancy)
        professionalProfileRepository.findOne = jest.fn().mockResolvedValue(profile)
        observationsRepository.create = jest.fn().mockResolvedValue(observation)
        observationsRepository.save = jest.fn().mockResolvedValue(observation)
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
        const result = await service.execute(createObservationRequestDTO)
        expect(result).toEqual(observation);
    });
})
