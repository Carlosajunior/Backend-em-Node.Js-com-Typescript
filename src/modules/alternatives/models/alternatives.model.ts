import { DefaultModel } from "@/modules/common/shared/models";
import { Questions } from "@/modules/questions/entities/question.entity";

export type AlternativesModel = DefaultModel & {
    description: string
    question_id: string
    question: Questions
}