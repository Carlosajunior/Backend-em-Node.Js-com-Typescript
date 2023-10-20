import { datatype } from "faker";
import { GetQuestionAnswersDTO } from "../../dto/get-question-answers.dto";

export const mockGetQuestionAnswersDTO = (): GetQuestionAnswersDTO => ({
    question_id: datatype.string(),
    page: datatype.number(),
    records_per_page: datatype.number()
})