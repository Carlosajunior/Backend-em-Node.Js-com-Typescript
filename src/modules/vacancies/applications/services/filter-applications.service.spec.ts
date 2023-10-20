import { mockColumnModel } from '@/modules/funnel/columns/mocks/models/columns.model.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { mockApplicationsRepository } from '../mocks';
import { mockFilterApplicationsDTO } from '../mocks/dtos/filter-applications.dto.mock';
import { ApplicationsRepository } from '../repositories';
import { FilterApplicationsService } from './filter-applications.service';

describe('FilterApplicationsService', () => {
    let service: FilterApplicationsService;
    let applicationsRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FilterApplicationsService,
                { provide: ApplicationsRepository, useFactory: mockApplicationsRepository }
            ],
        }).compile();

        applicationsRepository = module.get<ApplicationsRepository>(ApplicationsRepository);
        service = module.get<FilterApplicationsService>(FilterApplicationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should list adhering profiles.", async () => {
        const filterApplicationsDTO = mockFilterApplicationsDTO()
        const columns = [mockColumnModel()]
        const listApplies: Array<any> = [{
            ...columns,
            vancacy_id: filterApplicationsDTO.id,
            appy_count: 1,
            apply: [1]
        }]

        applicationsRepository.filterApplications = jest.fn().mockResolvedValue({
            results: listApplies?.sort((a, b) => (a.index > b.index ? 1 : -1)),
            search_limit: Math.ceil(filterApplicationsDTO.records_limit),
            total_results: 1
        })
        const result = await service.list(filterApplicationsDTO)
        expect(result).toEqual({
            results: listApplies?.sort((a, b) => (a.index > b.index ? 1 : -1)),
            search_limit: Math.ceil(filterApplicationsDTO.records_limit),
            total_results: 1
        })
    })

})
