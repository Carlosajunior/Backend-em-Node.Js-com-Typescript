import { DefaultModel } from '@/modules/common/shared/models'

export type OfficeModel = DefaultModel & {
  name: string
  duration: string
  location: string
  description: string
  initial_date: string
  end_date: string
  current_position: string
  experience_id: string
}
