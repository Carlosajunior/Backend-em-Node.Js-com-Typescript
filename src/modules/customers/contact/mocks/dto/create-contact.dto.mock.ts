import { mockCustomerModel } from "@/modules/customers/mocks";
import { datatype } from "faker";
import { CreateContactDTO } from "../../dto/create-contact.dto";

export const mockCreateContactDTO = (): CreateContactDTO => ({
    customer_id: datatype.string(),
    name: datatype.string(),
    phone: datatype.string(),
    cellphone: datatype.string(),
    email: datatype.string(),
    role: datatype.string(),
    department: datatype.string(),
    is_admin: datatype.boolean(),
    customer: mockCustomerModel()
})