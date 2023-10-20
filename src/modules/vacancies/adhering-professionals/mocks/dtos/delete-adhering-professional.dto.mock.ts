import { datatype } from "faker";
import { DeleteAdheringProfessionalRequest } from "../../services/delete-adhering-professional.service";

export const mockDeleteAdheringProfessionalRequest = (): DeleteAdheringProfessionalRequest => ({
    vacancy_id: datatype.number(),
    profile_id: datatype.string()
})