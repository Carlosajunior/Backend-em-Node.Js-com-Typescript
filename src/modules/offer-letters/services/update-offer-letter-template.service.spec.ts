import { Test, TestingModule } from '@nestjs/testing';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { mockOfferLetterTemplateRepository } from '../mocks/repositories/offer-letter-template.repository.mock';
import { UpdateOfferLetterTemplateService } from './update-offer-letter-template.service';
import { mockUpdateOfferLetterTemplateDTO } from '../mocks/dto/update-offer-letter-template.dto.mock';
import { mockOfferLetterTemplateModel } from '../mocks/models/offer-letter-template.model.mock';

describe('UpdateOfferLetterTemplateService', () => {
    let service: UpdateOfferLetterTemplateService;
    let offerLetterTemplateRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateOfferLetterTemplateService,
                { provide: OfferLetterTemplateRepository, useFactory: mockOfferLetterTemplateRepository }
            ],
        }).compile();

        offerLetterTemplateRepository = module.get<OfferLetterTemplateRepository>(OfferLetterTemplateRepository)
        service = module.get<UpdateOfferLetterTemplateService>(UpdateOfferLetterTemplateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update an offer letter template.', async () => {
        const updateOfferLetterTemplateDTO = mockUpdateOfferLetterTemplateDTO()
        const offerLetterTemplate = mockOfferLetterTemplateModel()
        offerLetterTemplateRepository.findOne = jest.fn().mockResolvedValue(offerLetterTemplate)
        offerLetterTemplateRepository.update = jest.fn().mockResolvedValue({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
        const result = await service.execute(updateOfferLetterTemplateDTO)
        expect(result).toEqual({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
    })

});
