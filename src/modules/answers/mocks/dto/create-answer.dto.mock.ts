import { datatype } from "faker";
import { AnswerQuestionDTO } from "../../dto/answer-question.dto";

export const mockCreateAnswerDTO = (): AnswerQuestionDTO => ({
    answers: [
        {
            profile_id: datatype.string(),
            question_id: datatype.string(),
            alternative_id: datatype.string(),
            answer: datatype.string()
        }
    ]
})