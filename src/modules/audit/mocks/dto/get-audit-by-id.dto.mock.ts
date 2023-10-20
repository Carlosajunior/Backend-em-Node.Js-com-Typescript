import { datatype } from "faker";
import { GetAuditByIdDTO } from "../../dtos/get-audit-by-id.dto";

export const mockGetAuditByIdDTO = (): GetAuditByIdDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number(),
    entity_id: datatype.string()
})