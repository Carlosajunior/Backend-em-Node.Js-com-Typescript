import { Test, TestingModule } from "@nestjs/testing";
import { mockColumnsRepository } from "../mocks";
import { mockCreateColumnDTO } from "../mocks/dtos/create-column.dto.mock";
import { mockColumnModel } from "../mocks/models/columns.model.mock";
import { ColumnsRepository } from "../repositories";
import { CreateColumnService } from "./create-column.service";

describe('CreateColumnService', () => {
    let service: CreateColumnService;
    let columnsRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateColumnService,
                { provide: ColumnsRepository, useFactory: mockColumnsRepository }
            ],
        }).compile();

        columnsRepository = module.get<ColumnsRepository>(ColumnsRepository)
        service = module.get<CreateColumnService>(CreateColumnService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create a column.', async () => {
        const column = mockColumnModel()
        const createColumnDTO = mockCreateColumnDTO()
        columnsRepository.createTag = jest.fn().mockResolvedValue(column)
        const result = await service.create(createColumnDTO)
        expect(result).toEqual(column)
    })
})