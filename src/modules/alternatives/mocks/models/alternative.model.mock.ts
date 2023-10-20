import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockQuestionsModel } from "@/modules/questions/mocks/models/questions.model.mock";
import { datatype } from "faker";
import { AlternativesModel } from "../../models/alternatives.model";

export const mockAlternativeModel = (): AlternativesModel => ({
    ...mockDefaultModel(),
    description: datatype.string(),
    question_id: datatype.string(),
    question: mockQuestionsModel()
})