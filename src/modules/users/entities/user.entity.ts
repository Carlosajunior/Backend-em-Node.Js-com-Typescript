import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { DefaultEntity } from '@/modules/common/shared/entities';
import { Roles } from '@/modules/roles/entities/roles.entity';
import { Squad } from '@/modules/squads/entities/squad.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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

  @Column({ nullable: true })
  squad_id: string;

  @ManyToOne(() => Squad, (squad) => squad.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'squad_id' })
  squad: Squad;

  @Column({ nullable: true })
  role_id: string;

  @ManyToOne(() => Roles, (roles) => roles.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'role_id' })
  roles: Roles
}
