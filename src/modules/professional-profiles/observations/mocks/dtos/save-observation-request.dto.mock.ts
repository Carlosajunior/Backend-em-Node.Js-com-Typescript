import { datatype } from "faker";
import { Request } from "../../services/create-observation.service";

export const mockRequestCreateObservation = (): Request => ({
    note: datatype.string(),
    profile_id: datatype.string(),
    vacancy_id: datatype.number(),
    user: datatype.string()
})