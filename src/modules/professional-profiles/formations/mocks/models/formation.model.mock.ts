import { datatype } from 'faker'

import { FormationModel } from '@/modules/professional-profiles/formations/models'
import { mockDefaultModel } from '@/modules/common/shared/mocks'

export const mockFormationModel = (): FormationModel => ({
  ...mockDefaultModel(),
  course: datatype.string(),
  end_date: datatype.string(),
  initial_date: datatype.string(),
  institution: datatype.string(),
  profile_id: datatype.string()
})
