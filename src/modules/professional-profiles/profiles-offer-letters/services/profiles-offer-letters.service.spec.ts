import { Test, TestingModule } from '@nestjs/testing';
import { mockGetProfileByOfferLetterStatusDTO } from '../mock/dtos/get-profile-by-offer-letters-status.dto.mock';
import { mockProfileOffertLettersModel } from '../mock/models/profile-offer-letters.model.mock';
import { mockProfileOffertLettersRepository } from '../mock/repositories/profile-offer-letters.repository.mock';
import { ProfileOfferLettersRepository } from '../repositories/profile-offer-letters.repository';
import { ProfilesOfferLettersService } from './profiles-offer-letters.service';

describe('ProfilesOfferLettersService', () => {
  let service: ProfilesOfferLettersService;
  let profileOfferLettersRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesOfferLettersService,
        { provide: ProfileOfferLettersRepository, useFactory: mockProfileOffertLettersRepository }
      ],
    }).compile();
    profileOfferLettersRepository = module.get<ProfileOfferLettersRepository>(ProfileOfferLettersRepository);
    service = module.get<ProfilesOfferLettersService>(ProfilesOfferLettersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return profiles by offer letter status', async () => {
    const getProfileByOfferLetterStatusDTO = mockGetProfileByOfferLetterStatusDTO()
    const profileOfferLetters = [mockProfileOffertLettersModel()]
    const profiles = profileOfferLetters.map((profiles) => Object.assign(profiles.profile, { type_of_contract: profiles.offer_letters.type_of_contract }, { title: profiles.offer_letters.vacancy.title }, { recruiter: profiles.offer_letters.vacancy.recruiter }))
    profileOfferLettersRepository.find = jest.fn().mockResolvedValue(profileOfferLetters)
    const result = await service.getProfileByOfferLetterStatus(getProfileByOfferLetterStatusDTO)
    expect(result).toEqual({
      results: profiles,
      page: getProfileByOfferLetterStatusDTO.page,
      last_page: (getProfileByOfferLetterStatusDTO.page - 1) * getProfileByOfferLetterStatusDTO.records_per_page > 0 ? getProfileByOfferLetterStatusDTO.page - 1 : null,
      total_results: profiles.length,
      total_pages: Math.ceil(profiles.length / (getProfileByOfferLetterStatusDTO.records_per_page ? getProfileByOfferLetterStatusDTO.records_per_page : 15))
    })
  });
});
