import { mockCreateProfileDTO } from "@/modules/professional-profiles/profiles/mocks";
import { mockProfileModel } from "@/modules/professional-profiles/profiles/mocks/models/profile.model.mock";
import { Test, TestingModule } from "@nestjs/testing";
import { mockListProfessionalsWithDossierDTO } from "../mocks/dto/list-professionals-with-dossier.dto.mock";
import { mockDossierModel } from "../mocks/models/dossier.model.mock";
import { mockDossierRepository } from "../mocks/repositories/dossier.repository.mock";
import { DossierRepository } from "../repositories/dossier.repository";
import { ListProfessionalsWithDossierService } from "./list-professional-with-dossier.service";

describe('ListProfessionalsWithDossierService', () => {
    let service: ListProfessionalsWithDossierService;
    let dossierRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListProfessionalsWithDossierService,
                { provide: DossierRepository, useFactory: mockDossierRepository }
            ],
        }).compile();

        dossierRepository = module.get<DossierRepository>(DossierRepository)
        service = module.get<ListProfessionalsWithDossierService>(ListProfessionalsWithDossierService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should list professional with same dossier status.', async () => {
        const dossierModel = mockDossierModel()
        const profileModel = mockProfileModel()
        Object.assign(dossierModel.observation, { profile: profileModel })
        const profiles = [dossierModel]
        const listProfessionalsWithDossierDTO = mockListProfessionalsWithDossierDTO()
        dossierRepository.find = jest.fn().mockResolvedValue(profiles)
        const result = await service.getProfilesListByDossierStatus(listProfessionalsWithDossierDTO)
        expect(result).toEqual({
            results: [profileModel],
            page: listProfessionalsWithDossierDTO.page,
            last_page: (listProfessionalsWithDossierDTO.page - 1) * listProfessionalsWithDossierDTO.records_per_page > 0 ? listProfessionalsWithDossierDTO.page - 1 : null,
            total_results: 1,
            total_pages: Math.ceil(1 / (listProfessionalsWithDossierDTO.records_per_page ? listProfessionalsWithDossierDTO.records_per_page : 15))
        })
    })
})