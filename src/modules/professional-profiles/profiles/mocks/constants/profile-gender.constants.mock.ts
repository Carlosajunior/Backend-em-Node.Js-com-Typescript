import { random } from 'faker'

import { ProfileGender } from '@/modules/professional-profiles/profiles/contansts'

export const mockProfileGender = (): ProfileGender =>
  random.arrayElement(Object.values(ProfileGender))
