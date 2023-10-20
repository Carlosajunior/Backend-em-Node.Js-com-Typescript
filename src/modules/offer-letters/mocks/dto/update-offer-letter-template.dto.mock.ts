import { datatype } from "faker";
import { TypeOfContract } from "../../constants/type-of-contract.constant";
import { UpdateOfferLetterTemplateRequest } from "../../services/update-offer-letter-template.service";

export const mockUpdateOfferLetterTemplateDTO = (): UpdateOfferLetterTemplateRequest => ({
    id: datatype.string(),
    text: datatype.string(),
    title: datatype.string(),
    type_of_contract: TypeOfContract.CLT
})