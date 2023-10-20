import { mockColumnsRepository } from '@/modules/funnel/columns/mocks';
import { mockColumnModel } from '@/modules/funnel/columns/mocks/models/columns.model.mock';
import { ColumnsRepository } from '@/modules/funnel/columns/repositories';
import { mockObservationModel } from '@/modules/professional-profiles/observations/mocks/models/observations.model.mock';
import { mockObservationsRepository } from '@/modules/professional-profiles/observations/mocks/repositories';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { internet } from 'faker';
import { mockMoveVacancyCandidateDTO } from '../mocks/dtos/move-vacancy-candidate.dto.mock';
import { mockVacancyModel } from '../mocks/models/vacancy.model.mock';
import { mockVacancyRepository } from '../mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { MoveVacancyCandidateService } from './move-vacancy-candidate.service';

describe('MoveVacancyCandidateService', () => {
    let service: MoveVacancyCandidateService;
    let vacancyRepository: any
    let observationRepository: any
    let columnRepository: any
    let elasticsearchService: ElasticsearchService
    const mockedNode = internet.url();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ElasticsearchModule.register({ node: mockedNode })],
            providers: [
                MoveVacancyCandidateService,
                { provide: VacancyRepository, useFactory: mockVacancyRepository },
                { provide: ColumnsRepository, useFactory: mockColumnsRepository },
                { provide: ObservationsRepository, useFactory: mockObservationsRepository }
            ]
        }).compile();

        elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
        vacancyRepository = module.get<VacancyRepository>(VacancyRepository);
        observationRepository = module.get<ObservationsRepository>(ObservationsRepository);
        columnRepository = module.get<ColumnsRepository>(ColumnsRepository);
        service = module.get<MoveVacancyCandidateService>(MoveVacancyCandidateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should move candidate on vacancy.', async () => {
        const moveVacancyCandidateDTO = mockMoveVacancyCandidateDTO()
        observationRepository.update = jest.fn()
        const vacancy = mockVacancyModel()
        vacancyRepository.findOne = jest.fn().mockResolvedValue(vacancy)
        const column = mockColumnModel()
        columnRepository.findOne = jest.fn().mockResolvedValue(column)
        observationRepository.update = jest.fn().mockResolvedValue({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
        const observation = mockObservationModel()
        observationRepository.findOne = jest.fn().mockResolvedValue(observation)
        const observations = [mockObservationModel()]
        observationRepository.listObservationsByProfile = jest.fn().mockResolvedValue(observations)
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
        const result = await service.execute(moveVacancyCandidateDTO)
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
    })

});
