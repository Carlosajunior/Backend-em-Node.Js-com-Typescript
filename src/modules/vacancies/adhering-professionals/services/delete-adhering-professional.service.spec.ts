import { Observation } from '@/modules/professional-profiles/observations/entities';
import { mockObservationModel } from '@/modules/professional-profiles/observations/mocks/models/observations.model.mock';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { internet } from 'faker';
import { Repository } from 'typeorm';
import { mockDeleteAdheringProfessionalRequest } from '../mocks/dtos/delete-adhering-professional.dto.mock';
import { DeleteAdheringProfessionalService } from './delete-adhering-professional.service';
import * as typeorm_functions from 'typeorm/globals';

describe('DeleteAdheringProfessionalService', () => {
    let service: DeleteAdheringProfessionalService;
    let elasticsearchService: ElasticsearchService
    const mockedNode = internet.url();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ElasticsearchModule.register({ node: mockedNode })],
            providers: [
                DeleteAdheringProfessionalService
            ],
        }).compile();

        elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
        service = module.get<DeleteAdheringProfessionalService>(DeleteAdheringProfessionalService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should delete adhering profile.", async () => {
        const observation = mockObservationModel()
        const deleteAdheringProfessionalRequest = mockDeleteAdheringProfessionalRequest()
        jest.spyOn(typeorm_functions, 'getRepository').mockReturnValue({
            findOne: jest.fn().mockResolvedValue(observation),
            find: jest.fn().mockResolvedValue([observation]),
            remove: jest.fn()
        } as unknown as Repository<Observation>);
        elasticsearchService.update = jest.fn()
        const result = await service.execute(deleteAdheringProfessionalRequest)
        expect(result).toEqual({
            ...observation,
            vacancy_id: deleteAdheringProfessionalRequest.vacancy_id.toString()
        })
    })

})
