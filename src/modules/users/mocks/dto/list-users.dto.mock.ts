import { datatype } from "faker";
import { ListUsersDTO } from "../../dtos/list-users.dto";

export const mockListUsersDTO = (): ListUsersDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number(),
    is_active: datatype.boolean()
})