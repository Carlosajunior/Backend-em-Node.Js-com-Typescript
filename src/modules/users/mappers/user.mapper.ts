import { TokenPayload } from '@/modules/common/auth/models/token-payload.model';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Phone } from '../value-objects/phone';
import { User } from './../entities/user.entity';

interface CognitoUser extends UserType {
  Group: string;
}
export class UserMapper {
  public static toMap(raw: User): User {
    return {
      ...raw,
      whatsapp_business: raw.whatsapp_business
        ? Phone.format(raw.whatsapp_business)
        : null
    };
  }

  public static fromCognitoUserToDTO(raw: CognitoUser): CreateUserDTO {
    const phone =
      raw.Attributes?.find((attr) => attr.Name === 'custom:whatsapp')?.Value ||
      '';

    return {
      access_profile: raw.Group as AccessProfiles,
      email: raw.Attributes?.find((attr) => attr.Name === 'email')?.Value || '',
      email_signature:
        raw.Attributes?.find((attr) => attr.Name === 'custom:signature')
          ?.Value || '',
      is_active: raw.Enabled,
      middle_name:
        raw.Attributes?.find((attr) => attr.Name === 'middle_name')?.Value ||
        '',
      name: raw.Attributes?.find((attr) => attr.Name === 'name')?.Value || '',
      position:
        raw.Attributes?.find((attr) => attr.Name === 'custom:position')
          ?.Value || '',
      whatsapp_business: phone ? Phone.removeSpecialChars(phone) : '',
      squad_id: null
    };
  }

  public static fromTokenToDTO(raw: TokenPayload): CreateUserDTO {
    return {
      access_profile: raw['cognito:groups']?.[0] as AccessProfiles,
      email: raw.email,
      email_signature: raw['custom:signature'] || '',
      middle_name: raw.middle_name,
      name: raw.name,
      position: raw['custom:position'] || '',
      squad_id: null,
      whatsapp_business: raw['custom:whatsapp'] || ''
    };
  }
}
