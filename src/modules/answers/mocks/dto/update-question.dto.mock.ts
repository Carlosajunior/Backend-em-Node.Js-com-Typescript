import { datatype } from "faker";
import { UpdateAnswerDTO } from "../../dto/update-answer.dto";

export const mockUpdateAnswerDTO = (): UpdateAnswerDTO => ({
    id: datatype.string(),
    profile_id: datatype.string(),
    question_id: datatype.string(),
    alternative_id: datatype.string(),
    answer: datatype.string()
})