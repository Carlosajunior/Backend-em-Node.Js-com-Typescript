import { Test, TestingModule } from '@nestjs/testing';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { mockOfferLetterTemplateRepository } from '../mocks/repositories/offer-letter-template.repository.mock';
import { ListOfferLetterTemplatesService } from './list-offer-letter-templates.service';
import { mockSearchOfferLettersTemplatesListDTO } from '../mocks/dto/search-offer-letters-templates-list.dto.mock';
import { mockOfferLetterTemplateModel } from '../mocks/models/offer-letter-template.model.mock';

describe('ListOfferLetterTemplatesService', () => {
    let service: ListOfferLetterTemplatesService;
    let offerLetterTemplateRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListOfferLetterTemplatesService,
                { provide: OfferLetterTemplateRepository, useFactory: mockOfferLetterTemplateRepository }
            ],
        }).compile();

        offerLetterTemplateRepository = module.get<OfferLetterTemplateRepository>(OfferLetterTemplateRepository)
        service = module.get<ListOfferLetterTemplatesService>(ListOfferLetterTemplatesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list offer letter templates.', async () => {
        const searchOfferLettersTemplatesListDTO = mockSearchOfferLettersTemplatesListDTO()
        const results = [mockOfferLetterTemplateModel()]
        offerLetterTemplateRepository.paginateByParams = jest.fn().mockResolvedValue({
            page: searchOfferLettersTemplatesListDTO.page,
            results: results,
            total_pages: Math.ceil(results.length / searchOfferLettersTemplatesListDTO.records_per_page),
            total_results: results.length,
            total_results_per_page: searchOfferLettersTemplatesListDTO.records_per_page
        })
        const result = await service.execute(searchOfferLettersTemplatesListDTO)
        expect(result).toEqual({
            page: searchOfferLettersTemplatesListDTO.page,
            results: results,
            total_pages: Math.ceil(results.length / searchOfferLettersTemplatesListDTO.records_per_page),
            total_results: results.length,
            total_results_per_page: searchOfferLettersTemplatesListDTO.records_per_page
        })
    })

});
