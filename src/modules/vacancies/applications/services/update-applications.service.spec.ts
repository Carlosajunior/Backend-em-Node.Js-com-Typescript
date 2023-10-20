import { mockObservationModel } from '@/modules/professional-profiles/observations/mocks/models/observations.model.mock';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype, internet } from 'faker';
import { UpdateApplicationsService } from './update-applications.service';
import { mockObservationsRepository } from '@/modules/professional-profiles/observations/mocks/repositories';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { UpdateApplicationsRepository } from '../repositories/update-applications.repository';
import { mockUpdateApplicationsRepository } from '../mocks';
import { RequestContext } from '@/modules/common/auth/middlewares';
import * as typeorm_functions from 'typeorm/globals';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

describe('UpdateApplicationsService', () => {
    let service: UpdateApplicationsService;
    let elasticsearchService: ElasticsearchService
    let observationsRepository: any
    let updateApplicationsRepository: any
    const mockedNode = internet.url();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ElasticsearchModule.register({ node: mockedNode })],
            providers: [
                UpdateApplicationsService,
                { provide: ObservationsRepository, useFactory: mockObservationsRepository },
                { provide: UpdateApplicationsRepository, useFactory: mockUpdateApplicationsRepository }
            ],
        }).compile();

        updateApplicationsRepository = module.get<UpdateApplicationsRepository>(UpdateApplicationsRepository)
        observationsRepository = module.get<ObservationsRepository>(ObservationsRepository)
        elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
        service = module.get<UpdateApplicationsService>(UpdateApplicationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should update observations to elastic.", async () => {
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
    })

    it("should update.", async () => {
        RequestContext.currentUser = jest.fn().mockResolvedValue({ email: datatype.string() })
        jest.spyOn(typeorm_functions, 'getRepository').mockReturnValue({
            findOne: jest.fn().mockResolvedValue(new User()),
        } as unknown as Repository<User>);
        const observation = mockObservationModel()
        updateApplicationsRepository.updateStage = jest.fn().mockResolvedValue(observation)
        service.update_observations_into_elastic = jest.fn()
        const result = await service.update(datatype.string(), { "linked_by": datatype.string(), "recruiter_id": datatype.string() })
        expect(result).toEqual(observation)
    })
})
