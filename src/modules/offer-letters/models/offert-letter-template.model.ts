import { DefaultModel } from "@/modules/common/shared/models";
import { User } from "@/modules/users/entities/user.entity";
import { TemplateStatus } from "../constants/template-status.constant";
import { TypeOfContract } from "../constants/type-of-contract.constant";

export type OfferLetterTemplateModel = DefaultModel & {
    status: TemplateStatus,
    text: string,
    title: string,
    type_of_contract: TypeOfContract,
    user_id: string,
    user: User
}