import { DefaultModel } from '@/modules/common/shared/models'

export type SearchModel = DefaultModel & {
  search: string
  page: number
  records_per_page: number
}
