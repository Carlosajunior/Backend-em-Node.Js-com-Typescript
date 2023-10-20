import { Test, TestingModule } from '@nestjs/testing';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { mockOfferLetterTemplateRepository } from '../mocks/repositories/offer-letter-template.repository.mock';
import { mockOfferLetterTemplateModel } from '../mocks/models/offer-letter-template.model.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { User } from '@/modules/users/entities/user.entity';
import { CreateOfferLetterService } from './create-offer-letter.service';
import { OfferLetterRepository } from '../repositories/offer-letter.repository';
import { mockOfferLetterRepository } from '../mocks/repositories/offer-letter.repository.mock';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { mockVacancyRepository } from '@/modules/vacancies/mocks/repositories/vacancy.repository.mock';
import { mockCreateOfferLetterDTO } from '../mocks/dto/create-offer-letter.dto.mock';
import { mockVacancyModel } from '@/modules/vacancies/mocks/models/vacancy.model.mock';
import { mockOfferLetterModel } from '../mocks/models/offer-letter.model.mock';

describe('CreateOfferLetterService', () => {
    let service: CreateOfferLetterService;
    let offerLetterTemplateRepository: any
    let userRepository: any
    let offerRepository: any
    let vacancyRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateOfferLetterService,
                { provide: OfferLetterTemplateRepository, useFactory: mockOfferLetterTemplateRepository },
                { provide: UserRepository, useFactory: mockUserRepository },
                { provide: OfferLetterRepository, useFactory: mockOfferLetterRepository },
                { provide: VacancyRepository, useFactory: mockVacancyRepository }
            ],
        }).compile();

        offerRepository = module.get<OfferLetterRepository>(OfferLetterRepository)
        vacancyRepository = module.get<VacancyRepository>(VacancyRepository)
        userRepository = module.get<UserRepository>(UserRepository)
        offerLetterTemplateRepository = module.get<OfferLetterTemplateRepository>(OfferLetterTemplateRepository)
        service = module.get<CreateOfferLetterService>(CreateOfferLetterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create offet letter.', async () => {
        const createOfferLetterTemplateDTO = mockCreateOfferLetterDTO()
        const offetLetterTemplate = mockOfferLetterTemplateModel()
        const user = new User()
        const vacancy = mockVacancyModel()
        const offerLetter = mockOfferLetterModel()
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        offerLetterTemplateRepository.findOne = jest.fn().mockResolvedValue(offetLetterTemplate)
        vacancyRepository.findOne = jest.fn().mockResolvedValue(vacancy)
        offerRepository.create = jest.fn().mockResolvedValue(offerLetter)
        offerRepository.save = jest.fn().mockResolvedValue(offerLetter)
        const result = await service.execute(createOfferLetterTemplateDTO)
        expect(result).toEqual(offerLetter)
    })

});
