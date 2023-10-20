import { datatype } from "faker";
import { CreateQuestionDTO } from "../../dto/create-question.dto";

export const mockCreateQuestionDTO = (): CreateQuestionDTO => ({
    title: datatype.string(),
    alternatives: [{
        description: datatype.string()
    }]
})