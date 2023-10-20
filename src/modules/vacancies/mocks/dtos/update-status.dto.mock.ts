import { datatype } from "faker";
import { UpdateVacancyStatusDTO } from "../../dtos/update-status.dto";

export const mockUpdateVacancyStatusDTO = (): UpdateVacancyStatusDTO => ({
    id: datatype.number(),
    status: datatype.string(),
    status_comments: datatype.string()
})