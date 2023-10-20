import { datatype } from 'faker'

import { LanguageModel } from '@/modules/common/languages/models'
import { mockLanguageLevel } from '@/modules/common/languages/mocks'

export const mockLanguageModel = (): LanguageModel => ({
  id: datatype.string(),
  language: datatype.string(),
  level: mockLanguageLevel()
})
