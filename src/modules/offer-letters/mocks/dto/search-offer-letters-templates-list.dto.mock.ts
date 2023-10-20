import { TypeSearch } from "@/modules/common/shared/constants/type-search.constant";
import { datatype } from "faker";
import { TemplateStatus } from "../../constants/template-status.constant";
import { TypeOfContract } from "../../constants/type-of-contract.constant";
import { SearchOfferLettersTemplatesLisDTO } from "../../dtos/search-offer-letters-templates-list.dto";

export const mockSearchOfferLettersTemplatesListDTO = (): SearchOfferLettersTemplatesLisDTO => ({
    type_search: TypeSearch.PARAMS,
    status: TemplateStatus.ACTIVE,
    title: datatype.string(),
    type_of_contract: TypeOfContract.CLT
})