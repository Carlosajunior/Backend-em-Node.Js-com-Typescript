import { NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { mockGetAuditByIdDTO } from "../mocks/dto/get-audit-by-id.dto.mock";
import { mockAuditRepository } from "../mocks/repositories";
import { AuditRepository } from "../repositories";
import { GetAuditByIdService } from "./get-audit-by-id.service";

describe('GetAuditByIdService', () => {
    let service: GetAuditByIdService;
    let auditRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAuditByIdService,
                { provide: AuditRepository, useFactory: mockAuditRepository }
            ],
        }).compile();

        service = module.get<GetAuditByIdService>(GetAuditByIdService);
        auditRepository = module.get<AuditRepository>(AuditRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return audit.', async () => {
        const getAuditByIdDTO = mockGetAuditByIdDTO()
        auditRepository.findByID = jest.fn().mockResolvedValue(getAuditByIdDTO)
        const result = await service.get(getAuditByIdDTO)
        expect(result).toBe(getAuditByIdDTO)
    })


    it('should throw an error at createAudit.', async () => {
        const getAuditByIdDTO = mockGetAuditByIdDTO()
        jest.spyOn(service, 'get').mockRejectedValueOnce(new NotAcceptableException())
        expect(service.get(getAuditByIdDTO)).rejects.toThrowError()
    })

})