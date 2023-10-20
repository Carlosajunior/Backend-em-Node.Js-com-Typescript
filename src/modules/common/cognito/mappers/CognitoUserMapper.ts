import { CreateCognitoUserDTO } from '@/modules/common/auth/dto/create-user.dto';
import { CreateUserDTO } from '@/modules/users/dtos/create-user.dto';
import { AccessProfiles } from '../../shared/constants/access-profiles';

export class CognitoUserMapper {
  public static toMap(data: CreateUserDTO): CreateCognitoUserDTO {
    return {
      'custom:message_quota': '500',
      'custom:position': data.position,
      'custom:whatsapp': data.whatsapp_business,
      email: data.email,
      email_verified: 'true',
      middle_name: data.middle_name,
      name: data.name
    };
  }

  public static toDomain(
    data: CreateCognitoUserDTO,
    access_profile: AccessProfiles,
    squad_id?: string
  ): CreateUserDTO {
    return {
      access_profile,
      email: data.email,
      email_signature: data['custom:signature'],
      middle_name: data.middle_name,
      name: data.name,
      position: data['custom:position'],
      whatsapp_business: data['custom:whatsapp'],
      squad_id: squad_id || null
    };
  }
}
