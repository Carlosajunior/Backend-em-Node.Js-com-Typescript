import { DefaultEntity } from '@/modules/common/shared/entities';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DossierStatus } from '../constants/dossier-status.constant';
import { ProfileDataStatus } from '../constants/profile-data-status.constant';

@Entity({
  name: 'dossiers'
})
export class Dossier extends DefaultEntity {
  @Column({
    nullable: true
  })
  answered_at: Date;

  @Column({
    nullable: true
  })
  cpf: string;

  @Column({
    nullable: true
  })
  data_are_divergent: boolean;

  @Column({
    nullable: true
  })
  data_are_true: boolean;

  @Column({
    enum: DossierStatus
  })
  dossier_status: DossierStatus;

  @Column({
    enum: ProfileDataStatus,
    nullable: true
  })
  profile_data_status: ProfileDataStatus;

  @Column({
    nullable: true
  })
  profile_ip: string;

  @Column({
    nullable: true
  })
  note: string;

  @Column()
  starts_at: Date;

  @Column()
  observation_id: string;

  @Column()
  user_id: string;

  @OneToOne(() => Observation, (obs) => obs.dossier, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'observation_id' })
  observation: Observation;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
