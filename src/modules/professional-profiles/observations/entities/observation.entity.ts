import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { DefaultEntity } from '@/modules/common/shared/entities';
import { Columns } from '@/modules/funnel/columns/entities';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { Dossier } from '@/modules/dossiers/entities/dossier.entity';
@Entity()
export class Observation extends DefaultEntity {
  @Column()
  note: string;

  @Column({ nullable: true })
  contact_date?: Date;

  @Column({ nullable: true })
  identify?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  column_id: string;

  @Column()
  profile_id: string;

  @Column({ nullable: true })
  recruiter_id?: string;

  @Column({ nullable: true })
  vacancy_id?: string;

  @Column({ nullable: true })
  linked_by: string;

  @ManyToOne(() => Columns, (columns) => columns.observations)
  @JoinColumn({ name: 'column_id' })
  column?: Columns;

  @ManyToOne(() => Profile, (profile) => profile.observations)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'recruiter_id' })
  recruiter?: User;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.observations)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy?: Vacancy;

  @OneToOne(() => Dossier, (dossier) => dossier.observation)
  dossier?: Dossier;
}
