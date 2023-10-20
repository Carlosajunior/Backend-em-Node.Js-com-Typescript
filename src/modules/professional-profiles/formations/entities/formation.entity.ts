import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { DefaultEntity } from '@/modules/common/shared/entities'
import { FormationModel } from '@/modules/professional-profiles/formations/models'

@Entity()
export class Formation extends DefaultEntity implements FormationModel {
  @Column()
  institution: string

  @Column()
  course: string

  @Column({ nullable: true })
  initial_date: string

  @Column({ nullable: true })
  end_date: string

  @Column()
  profile_id: string

  @ManyToOne(() => Profile, profile => profile.formations)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile 
}
