import { DefaultModel } from '@/modules/common/shared/models'
import { LanguageLevel } from '@/modules/professional-profiles/languages/constants'

export type LanguageModel = DefaultModel & {
  language: string
  level: LanguageLevel
  profile_id: string
}
