import { Test, TestingModule } from '@nestjs/testing';
import { CreateOfferService } from './create-offer.service';
import { OfferRepository } from '../repositories/offer.repository';
import { mockOfferRepository } from '../mocks/repositories/offer.repository.mock';
import { ContactRepository } from '@/modules/customers/contact/repositories/contact.repository';
import { mockContactRepository } from '@/modules/customers/mocks/repositories/contact.repository.mock';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { mockVacancyRepository } from '@/modules/vacancies/mocks/repositories/vacancy.repository.mock';
import { mockOfferDTO } from '../mocks/dto/offer.dto.mock';
import { datatype } from 'faker';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { mockVacancyModel } from '@/modules/vacancies/mocks/models/vacancy.model.mock';
import { mockContactModel } from '@/modules/customers/mocks';
import { mockOfferModel } from '../mocks/models/offer.model.mock';

describe('CreateOfferService', () => {
    let service: CreateOfferService;
    let contactRepository: any
    let vacancyRepository: any
    let offerRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateOfferService,
                { provide: OfferRepository, useFactory: mockOfferRepository },
                { provide: ContactRepository, useFactory: mockContactRepository },
                { provide: VacancyRepository, useFactory: mockVacancyRepository }
            ],
        }).compile();

        offerRepository = module.get<OfferRepository>(OfferRepository)
        contactRepository = module.get<ContactRepository>(ContactRepository)
        vacancyRepository = module.get<VacancyRepository>(VacancyRepository)
        service = module.get<CreateOfferService>(CreateOfferService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an offer letter template.', async () => {
        const offerDTO = mockOfferDTO()
        const vacancy = mockVacancyModel()
        const contact = mockContactModel()
        const offer = mockOfferModel()
        const user = {
            name: datatype.string(),
            middle_name: datatype.string()
        }
        contact.customerId = vacancy.customer.id
        offerDTO.recruiter_name = `${user.name} ${user.middle_name}`
        RequestContext.currentUser = jest.fn().mockResolvedValue(user)
        vacancyRepository.findOne = jest.fn().mockResolvedValue(vacancy)
        contactRepository.findOne = jest.fn().mockResolvedValue(contact)
        offerRepository.createOffer = jest.fn().mockResolvedValue(offer)
        const result = await service.execute(offerDTO)
        expect(result).toEqual(offer)
    })

});
