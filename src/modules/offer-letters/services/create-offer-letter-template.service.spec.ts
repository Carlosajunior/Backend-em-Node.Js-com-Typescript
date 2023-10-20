import { Test, TestingModule } from '@nestjs/testing';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { mockOfferLetterTemplateRepository } from '../mocks/repositories/offer-letter-template.repository.mock';
import { mockOfferLetterTemplateModel } from '../mocks/models/offer-letter-template.model.mock';
import { CreateOfferLetterTemplateService } from './create-offer-letter-template.service';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { User } from '@/modules/users/entities/user.entity';
import { mockCreateOfferLetterTemplateDTO } from '../mocks/dto/create-offer-letter-template.dto.mock';

describe('CreateOfferLetterTemplateService', () => {
    let service: CreateOfferLetterTemplateService;
    let offerLetterTemplateRepository: any
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateOfferLetterTemplateService,
                { provide: OfferLetterTemplateRepository, useFactory: mockOfferLetterTemplateRepository },
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository)
        offerLetterTemplateRepository = module.get<OfferLetterTemplateRepository>(OfferLetterTemplateRepository)
        service = module.get<CreateOfferLetterTemplateService>(CreateOfferLetterTemplateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create offert letter template.', async () => {
        const createOfferLetterTemplateDTO = mockCreateOfferLetterTemplateDTO()
        const offetLetterTemplate = mockOfferLetterTemplateModel()
        const user = new User()
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        offerLetterTemplateRepository.create = jest.fn().mockResolvedValue(offetLetterTemplate)
        offerLetterTemplateRepository.save = jest.fn().mockResolvedValue(offetLetterTemplate)
        const result = await service.execute(createOfferLetterTemplateDTO)
        expect(result).toEqual(offetLetterTemplate)
    })

});
