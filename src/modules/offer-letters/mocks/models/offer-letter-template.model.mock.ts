import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { User } from "@/modules/users/entities/user.entity";
import { datatype } from "faker";
import { TemplateStatus } from "../../constants/template-status.constant";
import { TypeOfContract } from "../../constants/type-of-contract.constant";
import { OfferLetterTemplateModel } from "../../models/offert-letter-template.model";

export const mockOfferLetterTemplateModel = (): OfferLetterTemplateModel => ({
    ...mockDefaultModel(),
    status: TemplateStatus.ACTIVE,
    text: datatype.string(),
    title: datatype.string(),
    type_of_contract: TypeOfContract.CLT,
    user_id: datatype.string(),
    user: new User()
})