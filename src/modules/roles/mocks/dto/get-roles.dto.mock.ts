import { datatype } from "faker";
import { GetRolesDTO } from "../../dto/get-roles.dto";

export const mockGetRolesDTO = (): GetRolesDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number(),
    search: datatype.string()
})