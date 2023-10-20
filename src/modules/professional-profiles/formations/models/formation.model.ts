import { DefaultModel } from '@/modules/common/shared/models'

export type FormationModel = DefaultModel & {
  institution: string
  course: string
  initial_date: string
  end_date: string
  profile_id: string
}
