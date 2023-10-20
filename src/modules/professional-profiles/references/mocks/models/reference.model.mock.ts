import { datatype } from 'faker'
import { ReferenceModel } from '@/modules/professional-profiles/references/models'
import { mockDefaultModel } from '@/modules/common/shared/mocks'

export const mockReferenceModel = (): ReferenceModel => ({
  ...mockDefaultModel(),
  description: datatype.string(),
  link: datatype.string(),
  profile_id: datatype.string()
})
