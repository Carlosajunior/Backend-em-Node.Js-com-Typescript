import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { DefaultEntity } from '@/modules/common/shared/entities'
import { SocialMediaModel } from '@/modules/professional-profiles/social-medias/models'

@Entity()
export class SocialMedia extends DefaultEntity implements SocialMediaModel {
  @Column()
  type: string

  @Column()
  link: string

  @Column()
  profile_id: string

  @ManyToOne(() => Profile, profile => profile.social_medias)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile
}
