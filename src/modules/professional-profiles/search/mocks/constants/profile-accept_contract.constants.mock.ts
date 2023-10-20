import { random } from 'faker'

import { ProfileAcceptContract } from '@/modules/professional-profiles/profiles/contansts'

export const mockProfileAcceptContract = (): ProfileAcceptContract =>
  random.arrayElement(Object.values(ProfileAcceptContract))
