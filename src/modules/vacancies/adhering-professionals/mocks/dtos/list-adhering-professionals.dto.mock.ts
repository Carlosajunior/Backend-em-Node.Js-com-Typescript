import { datatype } from "faker";
import { ListAdheringProfessionalsDTO } from "../../dtos/list-adhering-professionals.dto";

export const mockListAdheringProfessionalsDTO = (): ListAdheringProfessionalsDTO => ({
    vacancy_id: datatype.number(),
    page: datatype.number(),
    records_per_page: datatype.number(),
    search: datatype.string()
})