import { datatype } from "faker";
import { listSquadMembersDTO } from "../../dtos/list-members-squad.dto";

export const mockListSquadMembersDTO = (): listSquadMembersDTO => ({
    squad_id: datatype.string(),
    page: datatype.number(),
    records_per_page: datatype.number(),
    search: datatype.string()
})