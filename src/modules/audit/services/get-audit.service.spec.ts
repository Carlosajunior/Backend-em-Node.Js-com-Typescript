import { NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { mockCreateAuditDTO } from "../mocks/dto/create-audit.dto.mock";
import { mockGetAuditDTO } from "../mocks/dto/get-audit.dto.mock";
import { mockAuditRepository } from "../mocks/repositories";
import { AuditRepository } from "../repositories";
import { GetAuditService } from "./get-audit.service";

describe('GetAuditByIdService', () => {
    let service: GetAuditService;
    let auditRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAuditService,
                { provide: AuditRepository, useFactory: mockAuditRepository }
            ],
        }).compile();

        service = module.get<GetAuditService>(GetAuditService);
        auditRepository = module.get<AuditRepository>(AuditRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return list of audits.', async () => {
        const getAuditDTO = mockGetAuditDTO()
        const audit = [mockCreateAuditDTO()]
        auditRepository.findAudit = jest.fn().mockResolvedValue({
            results: audit,
            page: getAuditDTO.page,
            last_page: (getAuditDTO.page - 1) * getAuditDTO.records_per_page > 0 ? getAuditDTO.page - 1 : null,
            total_results_per_page: audit.length,
            total_results: 1,
            total_pages: Math.ceil(
                1 / (getAuditDTO.records_per_page ? getAuditDTO.records_per_page : 15)
            )
        })
        const result = await service.list(getAuditDTO)
        expect(result).toEqual({
            results: audit,
            page: getAuditDTO.page,
            last_page: (getAuditDTO.page - 1) * getAuditDTO.records_per_page > 0 ? getAuditDTO.page - 1 : null,
            total_results_per_page: audit.length,
            total_results: 1,
            total_pages: Math.ceil(
                1 / (getAuditDTO.records_per_page ? getAuditDTO.records_per_page : 15)
            )
        })
    })


    it('should throw an error at list.', async () => {
        const getAuditDTO = mockGetAuditDTO()
        jest.spyOn(service, 'list').mockRejectedValueOnce(new NotAcceptableException())
        expect(service.list(getAuditDTO)).rejects.toThrowError()
    })

})