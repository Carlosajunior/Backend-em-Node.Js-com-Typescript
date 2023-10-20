import { datatype } from "faker";
import { FilterApplicationsDTO } from "../../dtos/filter-applications.dto";

export const mockFilterApplicationsDTO = (): FilterApplicationsDTO => ({
    id: datatype.number(),
    records_limit: datatype.number(),
    order_by: datatype.string(),
    languages: [datatype.string()],
    work_modes: [datatype.string()],
    tags: [datatype.string()]
})