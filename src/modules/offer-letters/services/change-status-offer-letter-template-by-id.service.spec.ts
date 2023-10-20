import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { ChangeStatusOfferLetterTemplateByIdService } from './change-status-offer-letter-template-by-id.service';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { mockOfferLetterTemplateRepository } from '../mocks/repositories/offer-letter-template.repository.mock';
import { ShowOfferLetterTemplateService } from './show-offer-letter-template.service';
import { mockOfferLetterTemplateModel } from '../mocks/models/offer-letter-template.model.mock';

describe('ChangeStatusOfferLetterTemplateByIdService', () => {
    let service: ChangeStatusOfferLetterTemplateByIdService;
    let offerLetterTemplateRepository: any
    let showOfferLetterTemplateService: ShowOfferLetterTemplateService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeStatusOfferLetterTemplateByIdService,
                ShowOfferLetterTemplateService,
                { provide: OfferLetterTemplateRepository, useFactory: mockOfferLetterTemplateRepository }
            ],
        }).compile();

        showOfferLetterTemplateService = module.get<ShowOfferLetterTemplateService>(ShowOfferLetterTemplateService)
        offerLetterTemplateRepository = module.get<OfferLetterTemplateRepository>(OfferLetterTemplateRepository)
        service = module.get<ChangeStatusOfferLetterTemplateByIdService>(ChangeStatusOfferLetterTemplateByIdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should change template status.', async () => {
        const offetLetterTemplate = mockOfferLetterTemplateModel()
        showOfferLetterTemplateService.execute = jest.fn().mockResolvedValue(offetLetterTemplate)
        offerLetterTemplateRepository.update = jest.fn().mockResolvedValue({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
        const result = await service.execute(datatype.string())
        expect(result).toEqual({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
    })


});
