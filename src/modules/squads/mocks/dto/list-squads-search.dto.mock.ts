import { datatype } from "faker";
import { ListSquadsDTO } from "../../dtos/list-squads.dto";

export const mockListSquadsDTO = (): ListSquadsDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number(),
    search: datatype.string()
})