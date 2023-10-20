import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { DefaultEntity } from '@/modules/common/shared/entities'

@Entity()
export class Attachment extends DefaultEntity {
  @Column()
  name: string

  @Column()
  url: string

  @Column()
  profile_id: string

  @ManyToOne(() => Profile, profile => profile.attachments)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile
}
