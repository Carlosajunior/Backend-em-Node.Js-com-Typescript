import { DefaultModel } from '@/modules/common/shared/models'

export type SocialMediaModel = DefaultModel & {
  type: string
  link: string
  profile_id: string
}
