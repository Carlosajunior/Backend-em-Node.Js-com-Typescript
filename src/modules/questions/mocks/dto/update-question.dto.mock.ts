import { datatype } from "faker";
import { UpdateQuestionDTO } from "../../dto/update-question.dto";

export const mockUpdateQuestionDTO = (): UpdateQuestionDTO => ({
    id: datatype.string(),
    title: datatype.string()
})