import { TypeSearch } from "@/modules/common/shared/constants/type-search.constant";
import { State } from "@/modules/customers/entities/customer.entity";
import { datatype } from "faker";
import { DateOption } from "../../constants/date-option.constant";
import { Experience } from "../../constants/experience.constant";
import { WorkModel } from "../../constants/work-model.constant";
import { SearchVacanciesDTO } from "../../dtos/search-vacancies.dto";
import { mockLanguageDTO } from "./language.dto.mock";

export const mockSearchVacanciesDTO = (): SearchVacanciesDTO => ({
    type_search: TypeSearch.SEARCH,
    title: datatype.string(),
    identify: datatype.string(),
    customer_name: datatype.string(),
    experience_levels: [Experience.JUNIOR],
    languages: [mockLanguageDTO()],
    contract_models: [datatype.string()],
    tags: [datatype.string()],
    work_modes: [WorkModel.REMOTE],
    city: datatype.string(),
    state: State.BA,
    partner_company: datatype.string(),
    date_option: DateOption.BETWEEN,
    date: datatype.string(),
    date_start: datatype.string(),
    date_end: datatype.string(),
    status: [datatype.string()],
    project_time: datatype.string(),
})