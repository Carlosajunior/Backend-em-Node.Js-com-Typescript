import { datatype } from "faker";
import { GetAuditDTO } from "../../dtos";

export const mockGetAuditDTO = (): GetAuditDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number(),
    module: datatype.string(),
    date_option: datatype.string(),
    date_start: datatype.string(),
    date_end: datatype.string(),
    date: datatype.string(),
    user: datatype.string()
})