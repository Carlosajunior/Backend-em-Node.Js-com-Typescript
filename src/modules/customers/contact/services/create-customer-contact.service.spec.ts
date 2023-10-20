import { Test, TestingModule } from "@nestjs/testing";
import { mockContactModel, mockCustomerModel, mockCustomerRepository } from "../../mocks";
import { CustomerRepository } from "../../repositories/customer.repository";
import { mockCreateContactDTO } from "../mocks/dto/create-contact.dto.mock";
import { mockContactRepository } from "../mocks/repositories/contact.repository.mock";
import { ContactRepository } from "../repositories/contact.repository";
import { CreateCustomerContactService } from "./create-customer-contact.service";

describe('CreateCustomerContactService', () => {
    let service: CreateCustomerContactService;
    let contactRepository: any
    let customerRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCustomerContactService,
                { provide: ContactRepository, useFactory: mockContactRepository },
                { provide: CustomerRepository, useFactory: mockCustomerRepository }
            ],
        }).compile();

        customerRepository = module.get<CustomerRepository>(CustomerRepository)
        contactRepository = module.get<ContactRepository>(ContactRepository)
        service = module.get<CreateCustomerContactService>(CreateCustomerContactService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create customer contact.', async () => {
        const customer = mockCustomerModel()
        const createContactDTO = mockCreateContactDTO()
        const contact = mockContactModel()
        customerRepository.findOne = jest.fn().mockResolvedValue(customer)
        contactRepository.create = jest.fn().mockResolvedValue(contact)
        contactRepository.save = jest.fn().mockResolvedValue(contact)
        const result = await service.createCustomerContact(createContactDTO)
        expect(result).toEqual(contact)
    })
})