import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { LanguageLevel } from '../constants/language-level.constants'

import { LanguageModel } from '../models/language.model'

@Entity()
export class Languages implements LanguageModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  language: string

  @Column({ type: 'enum', enum: LanguageLevel })
  level: LanguageLevel
}
