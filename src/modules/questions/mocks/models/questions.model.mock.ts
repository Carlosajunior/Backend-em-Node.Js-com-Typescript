import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { datatype } from "faker";
import { QuestionsModel } from "../../models/questions.model";

export const mockQuestionsModel = (): QuestionsModel => ({
    ...mockDefaultModel(),
    title: datatype.string(),
    updated_by: datatype.string(),
    status: datatype.boolean()
})