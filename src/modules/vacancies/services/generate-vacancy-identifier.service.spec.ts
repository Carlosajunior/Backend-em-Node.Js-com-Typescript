import { Test, TestingModule } from '@nestjs/testing';
import { GenerateVacancyIdentifierService } from './generate-vacancy-identifier.service';

describe('GenerateVacancyIdentifierService', () => {
    let service: GenerateVacancyIdentifierService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GenerateVacancyIdentifierService
            ]
        }).compile();

        service = module.get<GenerateVacancyIdentifierService>(GenerateVacancyIdentifierService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a note.', async () => {
        const now = new Date();
        const fullYear = now.getFullYear().toString();
        const abbrYear = fullYear.substring(fullYear.length - 2, fullYear.length);
        const month = String(now.getMonth() + 1);
        const result = service.execute(1)
        const id = '001'
        expect(result).toEqual(abbrYear + month + id)
    })

});
