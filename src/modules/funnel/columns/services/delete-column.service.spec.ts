import { Test, TestingModule } from "@nestjs/testing";
import { datatype } from "faker";
import { mockColumnsRepository } from "../mocks";
import { ColumnsRepository } from "../repositories";
import { DeleteColumnService } from "./delete-column.service";

describe('DeleteColumnService', () => {
    let service: DeleteColumnService;
    let columnsRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteColumnService,
                { provide: ColumnsRepository, useFactory: mockColumnsRepository }
            ],
        }).compile();

        columnsRepository = module.get<ColumnsRepository>(ColumnsRepository)
        service = module.get<DeleteColumnService>(DeleteColumnService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it("should delete a column by it's id.", async () => {
        const id = datatype.string()
        columnsRepository.deleteById = jest.fn().mockResolvedValue({
            "raw": [],
            "affected": 1
        })
        const result = await service.delete(id)
        expect(result).toEqual({
            "raw": [],
            "affected": 1
        })
    })
})