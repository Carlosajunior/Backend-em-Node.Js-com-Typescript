import { datatype } from "faker";
import { TypeOfContract } from "../../constants/type-of-contract.constant";
import { CreateOfferLetterTemplateRequest } from "../../services/create-offer-letter-template.service";

export const mockCreateOfferLetterTemplateDTO = (): CreateOfferLetterTemplateRequest => ({
    text: datatype.string(),
    title: datatype.string(),
    type_of_contract: TypeOfContract.CLT,
    user_email: datatype.string()
})