import { Test, TestingModule } from '@nestjs/testing'
import { LanguageRepository } from '../repositories'
import { mockLanguageModel, mockLanguagesRepository } from '../mocks'
import { datatype } from 'faker'
import { LanguageService } from './language.service'

describe('LanguageService', () => {
    let service: LanguageService
    let languagesRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LanguageService,
                { provide: LanguageRepository, useFactory: mockLanguagesRepository }
            ]
        }).compile()

        service = module.get<LanguageService>(LanguageService)
        languagesRepository = module.get<LanguageRepository>(LanguageRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list profile languages', async () => {
        const languages = [mockLanguageModel()]
        languagesRepository.listLanguagesByProfile = jest.fn().mockResolvedValue(languages)
        const result = await service.listAllProfileLanguages(datatype.string())
        expect(result).toEqual(languages)
    });

})
