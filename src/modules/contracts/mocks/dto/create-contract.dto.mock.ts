import { datatype } from "faker";
import { CreateContractDTO } from "../../dto/create-contract.dto";

export const mockCreateContractDTO = (): CreateContractDTO => ({
    expiration_date: [new Date()],
    customer_id: datatype.string(),
    observations: [datatype.string()],
    alreadyUploaded: [datatype.boolean()]
})