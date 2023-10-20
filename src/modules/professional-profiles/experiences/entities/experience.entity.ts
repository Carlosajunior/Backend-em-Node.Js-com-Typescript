import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/modules/common/shared/entities';
import { ExperienceModel } from '@/modules/professional-profiles/experiences/models';
import { Office } from '@/modules/professional-profiles/offices/entities';
import { Profile } from '@/modules/professional-profiles/profiles/entities';

@Entity()
export class Experience extends DefaultEntity implements ExperienceModel {
  @Column()
  company: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  initial_date: string;

  @Column({ nullable: true })
  end_date: string;

  @Column({ nullable: true })
  current_position: string;

  @OneToMany(() => Office, (office) => office.experience, {
    cascade: ['remove', 'update', 'insert']
  })
  offices: Office[];

  @Column({ nullable: true })
  description: string;

  @Column()
  profile_id: string;

  @ManyToOne(() => Profile, (profile) => profile.experiences)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile;
}
