import { TypeSearch } from "@/modules/common/shared/constants/type-search.constant";
import { datatype } from "faker";
import { SearchDTO } from "../../dtos";

export const mockSearchDTO = (): SearchDTO => ({
    type_search: TypeSearch.SEARCH,
    search: datatype.string(),
    user_email: datatype.string(),
    professional_id: datatype.string(),
    vacancy_id: datatype.string(),
    page: datatype.number(),
    records_per_page: datatype.number(),
    date_start: datatype.string(),
    date_end: datatype.string(),
})