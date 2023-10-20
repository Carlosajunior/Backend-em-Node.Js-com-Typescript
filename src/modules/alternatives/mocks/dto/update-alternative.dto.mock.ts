import { datatype } from "faker";
import { UpdateAlternativeDTO } from "../../dto/update-alternative.dto";

export const mockUpdateAlternativeDTO = (): UpdateAlternativeDTO => ({
    id: datatype.string(),
    question_id: datatype.string(),
    description: datatype.string()
})