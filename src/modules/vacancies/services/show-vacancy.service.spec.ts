import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockVacancyModel } from '../mocks/models/vacancy.model.mock';
import { mockVacancyRepository } from '../mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { ShowVacancyService } from './show-vacancy.service';

describe('ShowVacancyService', () => {
    let service: ShowVacancyService;
    let vacancyRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowVacancyService,
                { provide: VacancyRepository, useFactory: mockVacancyRepository },
            ]
        }).compile();

        vacancyRepository = module.get<VacancyRepository>(VacancyRepository);
        service = module.get<ShowVacancyService>(ShowVacancyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a vacancy.', async () => {
        const vacancy = mockVacancyModel()
        vacancyRepository.findOne = jest.fn().mockResolvedValue(vacancy)
        const result = await service.execute(datatype.number())
        expect(result).toEqual(vacancy)
    })

});
