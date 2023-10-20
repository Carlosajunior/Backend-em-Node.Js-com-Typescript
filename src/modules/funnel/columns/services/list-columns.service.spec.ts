import { Test, TestingModule } from "@nestjs/testing";
import { mockColumnsRepository } from "../mocks";
import { mockListColumndsDTO } from "../mocks/dtos/list-columns.dto.mock";
import { mockColumnModel } from "../mocks/models/columns.model.mock";
import { ColumnsRepository } from "../repositories";
import { ListColumnsService } from "./list-columns.service";

describe('ListColumnsService', () => {
    let service: ListColumnsService;
    let columnsRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListColumnsService,
                { provide: ColumnsRepository, useFactory: mockColumnsRepository }
            ],
        }).compile();

        columnsRepository = module.get<ColumnsRepository>(ColumnsRepository)
        service = module.get<ListColumnsService>(ListColumnsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it("should list columns of a funnel.", async () => {
        const listColumnsDTO = mockListColumndsDTO()
        const columns = [mockColumnModel()]
        columnsRepository.findColumnsByFunnel = jest.fn().mockResolvedValue({
            results: columns,
            search_limit: listColumnsDTO.records_limit,
            total_results: columns.length,
        })
        const result = await service.list(listColumnsDTO)
        expect(result).toEqual({
            results: columns,
            search_limit: listColumnsDTO.records_limit,
            total_results: columns.length,
        })
    })
})