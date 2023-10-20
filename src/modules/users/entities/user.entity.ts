import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { DefaultEntity } from '@/modules/common/shared/entities';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users'
})
export class User extends DefaultEntity {
  @Column({
    unique: true
  })
  email: string;

  @Column()
  name: string;

  @Column()
  middle_name: string;

  @Column()
  position: string;

  @Column({
    nullable: true
  })
  email_signature: string;

  @Column()
  whatsapp_business: string;

  @Column({ default: false })
  can_edit_vacancy?: boolean;

  @Column({
    type: 'enum',
    enum: AccessProfiles
  })
  access_profile: AccessProfiles;

  @Column({ default: true })
  is_active: boolean;
}
