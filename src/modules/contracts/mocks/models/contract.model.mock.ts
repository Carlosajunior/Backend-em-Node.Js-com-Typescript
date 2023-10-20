import { mockCustomerModel } from "@/modules/customers/mocks";
import { datatype } from "faker";
import { Contract } from "../../entities/contract.entity";

export const mockContractModel = (): Contract => ({
    id: datatype.string(),
    expiration_date: new Date(),
    customer: mockCustomerModel(),
    customer_id: datatype.string(),
    observations: datatype.string(),
    name: datatype.string(),
    url: datatype.string(),
    created_at: new Date(),
    updated_at: new Date()
})