import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockSocialMediaModel, mockSocialMediasRepository } from '../mocks';
import { SocialMediasRepository } from '../repositories';
import { SocialMediaService } from './social-medias.service';

describe('SocialMediaService', () => {
    let service: SocialMediaService;
    let socialMediasRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SocialMediaService,
                { provide: SocialMediasRepository, useFactory: mockSocialMediasRepository }
            ],
        }).compile();

        socialMediasRepository = module.get<SocialMediasRepository>(SocialMediasRepository);
        service = module.get<SocialMediaService>(SocialMediaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return profile references.', async () => {
        const socialMedia = [mockSocialMediaModel()]
        socialMediasRepository.listSocialMediasByProfile = jest.fn().mockResolvedValue(socialMedia)
        const result = await service.listAllProfileSocialMedias(datatype.string())
        expect(result).toEqual(socialMedia)
    });
});
