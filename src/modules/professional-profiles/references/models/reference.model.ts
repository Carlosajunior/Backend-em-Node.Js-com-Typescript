import { DefaultModel } from '@/modules/common/shared/models'

export type ReferenceModel = DefaultModel & {
  description: string
  link: string
  profile_id: string
}
