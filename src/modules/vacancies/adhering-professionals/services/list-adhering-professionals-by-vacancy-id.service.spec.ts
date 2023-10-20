import { mockProfessionalProfileRepository } from '@/modules/common/elastic/mocks/repositories/professional-profile.repository.mock';
import { ProfessionalProfileRepository } from '@/modules/common/elastic/repositories/professional-profile.repository';
import { mockProfileModel } from '@/modules/professional-profiles/profiles/mocks/models/profile.model.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockVacancyModel } from '../../mocks/models/vacancy.model.mock';
import { mockVacancyRepository } from '../../mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '../../repositories/vacancy.repository';
import { mockListAdheringProfessionalsDTO } from '../mocks/dtos/list-adhering-professionals.dto.mock';
import { ListAdheringProfessionalsByVacancyIdService } from './list-adhering-professionals-by-vacancy-id.service';

describe('ListAdheringProfessionalsByVacancyIdService', () => {
    let service: ListAdheringProfessionalsByVacancyIdService;
    let vacancyRepository: any
    let professionalProfileRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListAdheringProfessionalsByVacancyIdService,
                { provide: ProfessionalProfileRepository, useFactory: mockProfessionalProfileRepository },
                { provide: VacancyRepository, useFactory: mockVacancyRepository }
            ],
        }).compile();

        vacancyRepository = module.get<VacancyRepository>(VacancyRepository);
        professionalProfileRepository = module.get<ProfessionalProfileRepository>(ProfessionalProfileRepository);
        service = module.get<ListAdheringProfessionalsByVacancyIdService>(ListAdheringProfessionalsByVacancyIdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should list adhering profiles.", async () => {
        const listAdheringProfessionalsDTO = mockListAdheringProfessionalsDTO()
        const vacancy = mockVacancyModel()
        const profile = mockProfileModel()
        const adheringProfiles = [{
            ...profile,
            adhesion: datatype.number(),
            _score: datatype.number(),
            is_new: datatype.boolean()
        }]
        vacancyRepository.findOne = jest.fn().mockResolvedValue(vacancy)
        professionalProfileRepository.findAdheringProfessionalsByVacancyId = jest.fn().mockResolvedValue(adheringProfiles)
        const result = await service.execute(listAdheringProfessionalsDTO)
        expect(result).toEqual(adheringProfiles)
    })

})
