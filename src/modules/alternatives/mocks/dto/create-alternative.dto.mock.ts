import { datatype } from "faker";
import { CreateAlternativeDTO } from "../../dto/create-alternative.dto";

export const mockCreateAlternativeDTO = (): CreateAlternativeDTO => ({
    question_id: datatype.string(),
    description: datatype.string()
})