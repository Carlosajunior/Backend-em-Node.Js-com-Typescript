import { datatype } from "faker";
import { SearchFunnelVacanciesRequest } from "../services/search-funnel-vacancies.service";

export const mockSearchFunnelVacanciesRequestDTO = (): SearchFunnelVacanciesRequest => ({
    page: datatype.number(),
    records_per_page: datatype.number(),
    funnel_id: datatype.string()
})