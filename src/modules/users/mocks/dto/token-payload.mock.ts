import { TokenPayload } from "@/modules/common/auth/models/token-payload.model"
import { AccessProfiles } from "@/modules/common/shared/constants/access-profiles"
import { datatype } from "faker"

export const mockTokenPayload = (): TokenPayload => ({
    'cognito:groups': [AccessProfiles.ADMINISTRATOR],
    'cognito:username': datatype.string(),
    'custom:message_quota': datatype.string(),
    'custom:position': datatype.string(),
    'custom:signature': datatype.string(),
    'custom:whatsapp': "(75) 98102-0881",
    aud: datatype.string(),
    auth_time: datatype.number(),
    email: 'test@email.com',
    email_verified: datatype.boolean(),
    event_id: datatype.string(),
    exp: datatype.number(),
    iat: datatype.number(),
    iss: datatype.string(),
    jti: datatype.string(),
    middle_name: 'middle_name',
    name: 'name',
    origin_jti: datatype.string(),
    id: datatype.string(),
    token_use: datatype.string(),
})