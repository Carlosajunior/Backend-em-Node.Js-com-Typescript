import { AccessProfiles } from "@/modules/common/shared/constants/access-profiles";
import { datatype } from "faker";
import { UpdateUserRequest } from "../../services/update-user.service";

export const mockUpdateUserDTO = (): UpdateUserRequest => ({
    id: datatype.uuid(),
    is_active: true,
    access_profile: AccessProfiles.ADMINISTRATOR,
    email: 'email@email.com',
    email_signature: datatype.string(),
    name: 'name',
    middle_name: 'middle_name',
    position: datatype.string(),
    squad_id: datatype.string(),
    whatsapp_business: '(75) 98102-0881',
})