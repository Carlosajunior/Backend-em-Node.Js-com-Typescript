import { random } from 'faker'

import { LanguageLevel } from '@/modules/professional-profiles/languages/constants'

export const mockLanguageLevel = (): LanguageLevel =>
  random.arrayElement(Object.values(LanguageLevel))
