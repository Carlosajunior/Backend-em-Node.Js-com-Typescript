import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'squads'
})
export class Squad extends DefaultEntity {
  @Column()
  name: string;

  @Column({
    default: true
  })
  is_active: boolean;

  @OneToMany(() => User, (user) => user.squad)
  users?: User[];
}
