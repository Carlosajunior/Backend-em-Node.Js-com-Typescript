import { datatype, internet } from 'faker'

import { SocialMediaModel } from '@/modules/professional-profiles/social-medias/models'
import { mockDefaultModel } from '@/modules/common/shared/mocks'

export const mockSocialMediaModel = (): SocialMediaModel => ({
  ...mockDefaultModel(),
  link: datatype.string(),
  profile_id: datatype.string(),
  type: datatype.string()
})
