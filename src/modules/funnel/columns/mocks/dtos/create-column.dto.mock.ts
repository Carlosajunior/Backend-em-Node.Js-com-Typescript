import { datatype } from "faker";
import { CreateColumnDTO } from "../../dtos";

export const mockCreateColumnDTO = (): CreateColumnDTO => ({
    name: datatype.string(),
    index: datatype.number(),
    postinterview: datatype.boolean(),
    preinterview: datatype.boolean(),
    funnel_id: datatype.string()
})