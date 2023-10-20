import { AccessProfiles } from "@/modules/common/shared/constants/access-profiles";
import { datatype } from "faker";
import { UpdateLoggedUserDTO } from "../../dtos/update-logged-user.dto";
import { mockTokenPayload } from "./token-payload.mock";

export const mockUpdateLoggedUserDTO = (): UpdateLoggedUserDTO => ({
    access_profile: AccessProfiles.ADMINISTRATOR,
    email: 'email@email.com',
    email_signature: datatype.string(),
    name: 'name',
    middle_name: 'middle_name',
    position: datatype.string(),
    squad_id: datatype.string(),
    whatsapp_business: '(75) 98102-0881',
    token_payload: mockTokenPayload()
})