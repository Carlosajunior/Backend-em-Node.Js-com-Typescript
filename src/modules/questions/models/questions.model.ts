import { DefaultModel } from "@/modules/common/shared/models";

export type QuestionsModel = DefaultModel & {
    title: string
    updated_by: string
    status: boolean
}