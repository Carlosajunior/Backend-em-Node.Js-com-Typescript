import { mockVacancyModel } from "@/modules/vacancies/mocks/models/vacancy.model.mock";
import { mockVacancyRepository } from "@/modules/vacancies/mocks/repositories/vacancy.repository.mock";
import { VacancyRepository } from "@/modules/vacancies/repositories/vacancy.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { mockSearchFunnelVacanciesRequestDTO } from "../dto/search-funnel-vacancies-request.dto.mock";
import { SearchFunnelVacanciesService } from "./search-funnel-vacancies.service";

describe('SearchFunnelVacanciesService', () => {
    let service: SearchFunnelVacanciesService;
    let vacancyRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchFunnelVacanciesService,
                { provide: VacancyRepository, useFactory: mockVacancyRepository }
            ]
        }).compile();

        vacancyRepository = module.get<VacancyRepository>(VacancyRepository)
        service = module.get<SearchFunnelVacanciesService>(SearchFunnelVacanciesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('should return a funnel.', async () => {
        const searchFunnelVacanciesRequest = mockSearchFunnelVacanciesRequestDTO()
        const results = [mockVacancyModel()]
        vacancyRepository.findAndCount = jest.fn().mockResolvedValue([results, results.length])
        const result = await service.execute(searchFunnelVacanciesRequest)
        expect(result).toEqual({
            page: searchFunnelVacanciesRequest.page,
            results: results,
            total_results_per_page: searchFunnelVacanciesRequest.records_per_page,
            total_results: results.length,
            total_pages: Math.ceil(results.length / searchFunnelVacanciesRequest.records_per_page)
        })
    })
})