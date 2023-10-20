import { datatype } from "faker";
import { ListColumnsDTO } from "../../dtos";

export const mockListColumndsDTO = (): ListColumnsDTO => ({
    id: datatype.string(),
    records_limit: datatype.number()
})