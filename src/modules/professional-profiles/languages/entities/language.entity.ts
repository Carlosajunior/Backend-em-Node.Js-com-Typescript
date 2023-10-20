import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Profile } from '@/modules/professional-profiles/profiles/entities'
import { LanguageLevel } from '@/modules/professional-profiles/languages/constants'
import { DefaultEntity } from '@/modules/common/shared/entities'
import { LanguageModel } from '@/modules/professional-profiles/languages/models'

@Entity()
export class Language extends DefaultEntity implements LanguageModel {
  @Column()
  language: string

  @Column({ type: 'enum', enum: LanguageLevel })
  level: LanguageLevel

  @Column()
  profile_id: string

  @ManyToOne(() => Profile, profile => profile.languages)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile
}
