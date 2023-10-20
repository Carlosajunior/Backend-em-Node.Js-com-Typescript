import { UpdateLoggedUserDTO } from '../dtos/update-logged-user.dto';
import { User } from '../entities/user.entity';
import { LoggedUserRestricted } from '../models/logged-user-restricted.model';
import { Phone } from '../value-objects/phone';

interface UpdatableRestrictedUser {
  email_signature: string;
  middle_name: string;
  name: string;
  whatsapp_business: string;
}

export class LoggedUserMapper {
  public static toMap(raw: User): LoggedUserRestricted {
    return {
      id: raw.id,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      email: raw.email,
      email_signature: raw.email_signature,
      middle_name: raw.middle_name,
      name: raw.name,
      whatsapp_business: raw.whatsapp_business
        ? Phone.format(raw.whatsapp_business)
        : null
    };
  }

  public static toUpdatableRestrictedUser(
    raw: UpdateLoggedUserDTO
  ): UpdatableRestrictedUser {
    return {
      email_signature: raw?.email_signature,
      middle_name: raw.middle_name,
      name: raw.name,
      whatsapp_business: raw?.whatsapp_business
    };
  }
}
