import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { mockOfferLetterTemplateRepository } from '../mocks/repositories/offer-letter-template.repository.mock';
import { mockOfferLetterTemplateModel } from '../mocks/models/offer-letter-template.model.mock';
import { ShowOfferLetterTemplateService } from './show-offer-letter-template.service';

describe('ShowOfferLetterTemplateService', () => {
    let service: ShowOfferLetterTemplateService;
    let offerLetterTemplateRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowOfferLetterTemplateService,
                { provide: OfferLetterTemplateRepository, useFactory: mockOfferLetterTemplateRepository }
            ],
        }).compile();

        offerLetterTemplateRepository = module.get<OfferLetterTemplateRepository>(OfferLetterTemplateRepository)
        service = module.get<ShowOfferLetterTemplateService>(ShowOfferLetterTemplateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an offer letter template.', async () => {
        const offerLetterTemplate = mockOfferLetterTemplateModel()
        offerLetterTemplateRepository.findOne = jest.fn().mockResolvedValue(offerLetterTemplate)
        const result = await service.execute(datatype.uuid())
        expect(result).toEqual(offerLetterTemplate)
    })

});
