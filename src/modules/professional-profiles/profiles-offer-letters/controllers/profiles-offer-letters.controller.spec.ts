import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesOfferLettersController } from './profiles-offer-letters.controller';
import { ProfilesOfferLettersService } from '../services/profiles-offer-letters.service';
import { ProfileOfferLettersRepository } from '../repositories/profile-offer-letters.repository';
import { mockProfileOffertLettersRepository } from '../mock/repositories/profile-offer-letters.repository.mock';

describe('ProfilesOfferLettersController', () => {
  let controller: ProfilesOfferLettersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesOfferLettersController],
      providers: [ProfilesOfferLettersService,
        { provide: ProfileOfferLettersRepository, useFactory: mockProfileOffertLettersRepository }],
    }).compile();

    controller = module.get<ProfilesOfferLettersController>(ProfilesOfferLettersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
