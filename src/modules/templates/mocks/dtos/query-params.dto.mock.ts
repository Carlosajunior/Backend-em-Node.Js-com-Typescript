import { TypeSearch } from "@/modules/common/shared/constants/type-search.constant";
import { datatype } from "faker";
import { QueryParams } from "../../dtos/query-params.dto";

export const mockQueryParams = (): QueryParams => ({
    type: datatype.string(),
    active: datatype.boolean(),
    type_search: TypeSearch.PARAMS,
    search: datatype.string(),
    user_email: datatype.string(),
    professional_id: datatype.string(),
    vacancy_id: datatype.string(),
    page: datatype.number(),
    records_per_page: datatype.number(),
    date_end: datatype.string(),
    date_start: datatype.string()
})