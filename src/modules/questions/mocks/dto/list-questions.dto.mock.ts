import { datatype } from "faker";
import { ListQuestionsDTO } from "../../dto/list-questions.dto";

export const mockListQuestionsDTO = (): ListQuestionsDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number()
})