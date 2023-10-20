import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { DefaultEntity } from '@/modules/common/shared/entities'
import { ReferenceModel } from '@/modules/professional-profiles/references/models'

@Entity()
export class Reference extends DefaultEntity implements ReferenceModel {
  @Column()
  description: string

  @Column()
  link: string

  @Column()
  profile_id: string

  @ManyToOne(() => Profile, profile => profile.references)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile
}
