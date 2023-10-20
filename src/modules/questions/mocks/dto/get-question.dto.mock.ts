import { datatype } from "faker";
import { GetQuestionDTO } from "../../dto/get-question.dto";

export const mockGetQuestionDTO = (): GetQuestionDTO => ({
    id: datatype.string()
})