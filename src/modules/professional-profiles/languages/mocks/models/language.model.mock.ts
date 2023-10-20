import { datatype } from 'faker'

import { LanguageModel } from '@/modules/professional-profiles/languages/models'
import { mockLanguageLevel } from '@/modules/professional-profiles/languages/mocks'
import { mockDefaultModel } from '@/modules/common/shared/mocks'

export const mockLanguageModel = (): LanguageModel => ({
  ...mockDefaultModel(),
  language: datatype.string(),
  level: mockLanguageLevel(),
  profile_id: datatype.string()
})
