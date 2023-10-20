import { mockProfessionalProfileRepository } from '@/modules/common/elastic/mocks/repositories/professional-profile.repository.mock';
import { ProfessionalProfileRepository } from '@/modules/common/elastic/repositories/professional-profile.repository';
import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { mockProfileModel } from '@/modules/professional-profiles/profiles/mocks/models/profile.model.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { ListAdheringProfessionalsByVacancyIdService } from '../adhering-professionals/services/list-adhering-professionals-by-vacancy-id.service';
import { VacancyMapper } from '../mappers/vacancy.mapper';
import { mockSearchVacanciesDTO } from '../mocks/dtos/search-vacancies.dto.mock';
import { mockVacancyModel } from '../mocks/models/vacancy.model.mock';
import { mockVacancyRepository } from '../mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { ListVacanciesService } from './list-vacancies.service';

describe('ListVacanciesService', () => {
    let service: ListVacanciesService;
    let vacancyRepository: any
    let listAdheringProfessionalsByVacancyIdService: ListAdheringProfessionalsByVacancyIdService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListVacanciesService,
                ListAdheringProfessionalsByVacancyIdService,
                { provide: VacancyRepository, useFactory: mockVacancyRepository },
                { provide: ProfessionalProfileRepository, useFactory: mockProfessionalProfileRepository }
            ]
        }).compile();

        listAdheringProfessionalsByVacancyIdService = module.get<ListAdheringProfessionalsByVacancyIdService>(ListAdheringProfessionalsByVacancyIdService);
        vacancyRepository = module.get<VacancyRepository>(VacancyRepository);
        service = module.get<ListVacanciesService>(ListVacanciesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return vacancies for search type.', async () => {
        const searchVacanciesDTO = mockSearchVacanciesDTO()
        const vacancies = [mockVacancyModel()]
        let vacancy = vacancies?.map((vacancy) => VacancyMapper.toMap(vacancy))[0]
        const resolved = {
            page: 1,
            results: [vacancy],
            total_pages: 1,
            total_results: 1,
            total_results_per_page: 1
        }
        vacancyRepository.paginateBySearch = jest.fn().mockResolvedValue(resolved)
        const profile = mockProfileModel()
        const adheringProfiles = {
            results: [{
                ...profile,
                adhesion: datatype.number(),
                _score: datatype.number(),
                is_new: datatype.boolean()
            }]
        }
        listAdheringProfessionalsByVacancyIdService.execute = jest.fn().mockResolvedValue(adheringProfiles)
        const result = await service.execute(searchVacanciesDTO)
        for await (let vacancy of resolved.results) {
            resolved.results[resolved.results.indexOf(vacancy)].total_candidates = 1
        }
        expect(result).toEqual(resolved)
    })

    it('should return vacancies for params type.', async () => {
        const searchVacanciesDTO = mockSearchVacanciesDTO()
        searchVacanciesDTO.type_search = TypeSearch.PARAMS
        const vacancies = [mockVacancyModel()]
        let vacancy = vacancies?.map((vacancy) => VacancyMapper.toMap(vacancy))[0]
        const resolved = {
            page: 1,
            results: [vacancy],
            total_pages: 1,
            total_results: 1,
            total_results_per_page: 1
        }
        vacancyRepository.paginateByParams = jest.fn().mockResolvedValue(resolved)
        const profile = mockProfileModel()
        const adheringProfiles = {
            results: [{
                ...profile,
                adhesion: datatype.number(),
                _score: datatype.number(),
                is_new: datatype.boolean()
            }]
        }
        listAdheringProfessionalsByVacancyIdService.execute = jest.fn().mockResolvedValue(adheringProfiles)
        const result = await service.execute(searchVacanciesDTO)
        expect(result).toEqual(resolved)
    })

});
