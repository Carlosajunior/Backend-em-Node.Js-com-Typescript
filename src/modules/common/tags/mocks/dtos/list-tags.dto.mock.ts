import { datatype } from 'faker'

import { ListTagsDTO } from '@/modules/common/tags/dtos'

export const mockListTagsDTO = (): ListTagsDTO => ({
  category: undefined,
  to_approve: false,
  page: datatype.number(),
  records_per_page: datatype.number(),
  search: datatype.string()
})
