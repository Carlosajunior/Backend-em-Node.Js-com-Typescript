import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator'

import { LanguageLevel } from '@/modules/professional-profiles/languages/constants'

export class UpdateLanguageDTO {
  id: string

  @MaxLength(15)
  @IsNotEmpty()
  language: string

  @IsEnum(LanguageLevel)
  @IsNotEmpty()
  level: LanguageLevel

  profile_id: string
}
