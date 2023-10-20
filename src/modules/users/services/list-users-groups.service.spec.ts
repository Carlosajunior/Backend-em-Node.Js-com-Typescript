import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { mockListUsersDTO } from '../mocks/dto/list-users.dto.mock';
import { ListUsersGroupsService } from './list-users-groups.service';

describe('ListUsersGroupsService', () => {
    let service: ListUsersGroupsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListUsersGroupsService
            ],
        }).compile();

        service = module.get<ListUsersGroupsService>(ListUsersGroupsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should return a list of groups.", async () => {
        const result = await service.execute()
        expect(result).toEqual([
            {
                "label": "Administrador",
                "value": "Administrador",
            },
            {
                "label": "Administrativo",
                "value": "Administrativo",
            },
            {
                "label": "Comercial",
                "value": "Comercial",
            },
            {
                "label": "Gestão Comercial",
                "value": "GestaoComercial",
            },
            {
                "label": "Gestão Recrutamento",
                "value": "GestaoRecrutamento",
            },
            {
                "label": "Recrutador",
                "value": "Recrutador",
            }
        ])
    })

})
