import { datatype } from "faker";
import { GetQuestionAnswersByProfileDTO } from "../../dto/get-question-answers-by-profile.dto";

export const mockGetQuestionAnswersByProfileDTO = (): GetQuestionAnswersByProfileDTO => ({
    profile_id: datatype.string(),
    page: datatype.number(),
    records_per_page: datatype.number()
})