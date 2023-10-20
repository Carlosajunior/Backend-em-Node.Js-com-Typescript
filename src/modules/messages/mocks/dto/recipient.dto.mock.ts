import { datatype } from "faker";
import { RecipientDTO } from "../../dtos";

export const mockRecipientDTO = (): RecipientDTO => ({
    name: datatype.string(),
    phone: datatype.string(),
    email: datatype.string(),
    edit_candidate: datatype.boolean(),
    observation_id: datatype.string()
})