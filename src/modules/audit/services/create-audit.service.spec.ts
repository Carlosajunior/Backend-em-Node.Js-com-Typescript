import { RequestContext } from "@/modules/common/auth/middlewares";
import { mockCreateUserDTO } from "@/modules/users/mocks/dto/create-user.dto.mock";
import { mockUserRepository } from "@/modules/users/mocks/repositories/user-repository.mock";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { datatype } from "faker";
import { mockCreateAuditDTO } from "../mocks/dto/create-audit.dto.mock";
import { mockAuditRepository } from "../mocks/repositories";
import { AuditRepository } from "../repositories";
import { CreateAuditService } from "./create-audit.service";

describe('CreateAuditService', () => {
    let service: CreateAuditService;
    let auditRepository: any
    let userRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAuditService,
                { provide: AuditRepository, useFactory: mockAuditRepository },
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        service = module.get<CreateAuditService>(CreateAuditService);
        auditRepository = module.get<AuditRepository>(AuditRepository);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create and return audit.', async () => {
        const audit = mockCreateAuditDTO()
        const user = mockCreateUserDTO()
        Object.assign(user, { id: datatype.string() })
        RequestContext.currentUser = jest.fn().mockResolvedValue({
            id: "id",
            name: "name",
            middle_name: "middle_name",
            email: "email",
            ip: "ip"
        })
        userRepository.findOne = jest.fn().mockResolvedValue(user)
        audit.creator_id = user["id"]
        auditRepository.createAudit = jest.fn().mockResolvedValue(audit)
        const result = await service.createAudit(audit)
        expect(result).toBe(audit)
    })

    it('should throw an error if cannot find user.', async () => {
        const audit = mockCreateAuditDTO()
        RequestContext.currentUser = jest.fn().mockResolvedValue({
            id: "id",
            name: "name",
            middle_name: "middle_name",
            email: "email",
            ip: "ip"
        })
        userRepository.findOne = jest.fn().mockResolvedValue(null)
        const result = await service.createAudit(audit)
        expect(result).toEqual(new NotAcceptableException("Usuário da auditoria não foi encontrado."))
    })

    it('should throw an error at createAudit.', async () => {
        const audit = mockCreateAuditDTO()
        jest.spyOn(service, 'createAudit').mockRejectedValueOnce(new NotAcceptableException())
        expect(service.createAudit(audit)).rejects.toThrowError()
    })

})