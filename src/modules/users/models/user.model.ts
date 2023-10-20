import { Entity } from '@/modules/common/shared/core/entity';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Email } from '../value-objects/email';
import { Name } from '../value-objects/name';
import { Phone } from '../value-objects/phone';

export class UserModel extends Entity<CreateUserDTO> {
  private constructor(props: CreateUserDTO) {
    super(props);
  }

  public static create(entity: CreateUserDTO): UserModel {
    const email = Email.create({
      value: entity.email
    });

    const name = Name.create({
      value: entity.name
    });

    const whatsapp_business = Phone.create({
      value: entity.whatsapp_business
    });

    const user = new UserModel({
      access_profile: entity.access_profile,
      email: email.value,
      name: name.value,
      email_signature: entity.email_signature,
      middle_name: entity.middle_name.trim(),
      position: entity.position,
      squad_id: entity?.squad_id || null,
      whatsapp_business: whatsapp_business.value
    });
    return user;
  }
}
