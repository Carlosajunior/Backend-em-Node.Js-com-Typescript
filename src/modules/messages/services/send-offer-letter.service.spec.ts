import { mockOfferLetterRepository } from "@/modules/offer-letters/mocks/repositories/offer-letter.repository.mock";
import { OfferLetterRepository } from "@/modules/offer-letters/repositories/offer-letter.repository";
import { mockProfileOffertLettersModel } from "@/modules/professional-profiles/profiles-offer-letters/mock/models/profile-offer-letters.model.mock";
import { mockProfileOffertLettersRepository } from "@/modules/professional-profiles/profiles-offer-letters/mock/repositories/profile-offer-letters.repository.mock";
import { ProfileOfferLettersRepository } from "@/modules/professional-profiles/profiles-offer-letters/repositories/profile-offer-letters.repository";
import { mockProfilesRepository } from "@/modules/professional-profiles/profiles/mocks";
import { ProfilesRepository } from "@/modules/professional-profiles/profiles/repositories";
import { mockTemplateRepository } from "@/modules/templates/mocks";
import { TemplateRepository } from "@/modules/templates/repositories/template.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { datatype } from "faker";
import { SendOfferLetterService } from "./send-offer-letter.service";

describe('SendOfferLetterService', () => {
    let service: SendOfferLetterService;
    let profileOfferLettersRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SendOfferLetterService,
                { provide: TemplateRepository, useFactory: mockTemplateRepository },
                { provide: ProfileOfferLettersRepository, useFactory: mockProfileOffertLettersRepository },
                { provide: ProfilesRepository, useFactory: mockProfilesRepository },
                { provide: OfferLetterRepository, useFactory: mockOfferLetterRepository }
            ]
        }).compile();

        profileOfferLettersRepository = module.get<ProfileOfferLettersRepository>(ProfileOfferLettersRepository)
        service = module.get<SendOfferLetterService>(SendOfferLetterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('return a profile offer letter.', async () => {
        const profileOfferLetter = mockProfileOffertLettersModel()
        profileOfferLettersRepository.find = jest.fn().mockResolvedValue(profileOfferLetter)
        const result = await service.verifyCanReceiveOfferLetter(datatype.string(), datatype.number())
        expect(result).toEqual(profileOfferLetter)
    })
})