import { Test, TestingModule } from "@nestjs/testing";
import { datatype } from "faker";
import { mockContactModel } from "../../mocks";
import { mockContactRepository } from "../mocks/repositories/contact.repository.mock";
import { ContactRepository } from "../repositories/contact.repository";
import { GetCustomerAdminsService } from "./get-customer-admins.service";

describe('GetCustomerAdminsService', () => {
    let service: GetCustomerAdminsService;
    let contactRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCustomerAdminsService,
                { provide: ContactRepository, useFactory: mockContactRepository }
            ],
        }).compile();

        contactRepository = module.get<ContactRepository>(ContactRepository)
        service = module.get<GetCustomerAdminsService>(GetCustomerAdminsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should return list of admins contacts.', async () => {
        const contact = mockContactModel()
        contactRepository.find = jest.fn().mockResolvedValue(contact)
        const result = await service.getCustomerAdmins({ customer_id: datatype.uuid(), is_admin: datatype.boolean() })
        expect(result).toEqual(contact)
    })
})