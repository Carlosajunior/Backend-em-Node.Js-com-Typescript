import { Test, TestingModule } from '@nestjs/testing';
import { mockUpdateVacancyStatusDTO } from '../mocks/dtos/update-status.dto.mock';
import { mockVacancyRepository } from '../mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { UpdateVacancyStatusService } from './update-vacancy-status.service';

describe('UpdateVacancyStatusService', () => {
    let service: UpdateVacancyStatusService;
    let vacancyRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateVacancyStatusService,
                { provide: VacancyRepository, useFactory: mockVacancyRepository },
            ]
        }).compile();

        vacancyRepository = module.get<VacancyRepository>(VacancyRepository);
        service = module.get<UpdateVacancyStatusService>(UpdateVacancyStatusService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update a vacancy status.', async () => {
        const updateVacancyStatusDTO = mockUpdateVacancyStatusDTO()
        vacancyRepository.update = jest.fn().mockResolvedValue({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
        const result = await service.execute(updateVacancyStatusDTO)
        expect(result).toEqual({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
    })

});
