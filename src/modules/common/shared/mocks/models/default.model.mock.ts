import { datatype, date } from 'faker'

import { DefaultModel } from '@/modules/common/shared/models'

export const mockDefaultModel = (): DefaultModel => ({
  id: datatype.string(),
  created_at: date.past(),
  updated_at: date.past()
})
