import { Test, TestingModule } from "@nestjs/testing";
import { datatype } from "faker";
import { mockMessagesRepository } from "../mocks";
import { mockSearchDTO } from "../mocks/dto/search.dto.mock";
import { mockMessageToProfile } from "../mocks/models/message-to-profile.model.mock";
import { mockMessageModel } from "../mocks/models/message.model.mock";
import { MessagesRepository } from "../repositories";
import { MessageService } from "./message.service";

describe('MessageService', () => {
    let service: MessageService;
    let messagesRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageService,
                { provide: MessagesRepository, useFactory: mockMessagesRepository }
            ]
        }).compile();

        messagesRepository = module.get<MessagesRepository>(MessagesRepository)
        service = module.get<MessageService>(MessageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('should return a list of messages.', async () => {
        const searchDTO = mockSearchDTO()
        const results = [mockMessageModel()]
        messagesRepository.findMessages = jest.fn().mockResolvedValue({
            page: searchDTO.page,
            last_page: (searchDTO.page - 1) * searchDTO.records_per_page > 0 ? searchDTO.page - 1 : null,
            results: results,
            total_results_per_page: searchDTO.records_per_page,
            total_results: results.length,
            total_pages: Math.ceil(results.length / searchDTO.records_per_page)
        })
        const result = await service.list(searchDTO, [''])
        expect(result).toEqual({
            page: searchDTO.page,
            last_page: (searchDTO.page - 1) * searchDTO.records_per_page > 0 ? searchDTO.page - 1 : null,
            results: results,
            total_results_per_page: searchDTO.records_per_page,
            total_results: results.length,
            total_pages: Math.ceil(results.length / searchDTO.records_per_page)
        })
    })

    it('list messages recipients.', async () => {
        const searchDTO = mockSearchDTO()
        const results = [mockMessageToProfile()]
        messagesRepository.findRecipientsByMessageId = jest.fn().mockResolvedValue({
            page: searchDTO.page,
            last_page: (searchDTO.page - 1) * searchDTO.records_per_page > 0 ? searchDTO.page - 1 : null,
            results: results.map((result) => result.profile),
            total_results_per_page: searchDTO.records_per_page,
            total_results: results.length,
            total_pages: Math.ceil(results.length / searchDTO.records_per_page)
        })
        const result = await service.getRecipientsByMessageId({
            id: datatype.string(),
            page: searchDTO.page,
            records_per_page: searchDTO.page,
            search: searchDTO.search
        })
        expect(result).toEqual({
            page: searchDTO.page,
            last_page: (searchDTO.page - 1) * searchDTO.records_per_page > 0 ? searchDTO.page - 1 : null,
            results: [results.at(0).profile],
            total_results_per_page: searchDTO.records_per_page,
            total_results: results.length,
            total_pages: Math.ceil(results.length / searchDTO.records_per_page)
        })
    })
})