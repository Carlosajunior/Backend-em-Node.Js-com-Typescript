import { AccessProfiles } from "@/modules/common/shared/constants/access-profiles";
import { datatype } from "faker";
import { CreateUserDTO } from "../../dtos/create-user.dto";

export const mockCreateUserDTO = (): CreateUserDTO => ({
    access_profile: AccessProfiles.ADMINISTRATOR,
    email: 'test@email.com',
    email_signature: datatype.string(),
    name: 'name',
    middle_name: 'middle_name',
    position: datatype.string(),
    squad_id: datatype.string(),
    whatsapp_business: "(75) 98102-0881",
    is_active: datatype.boolean()
})