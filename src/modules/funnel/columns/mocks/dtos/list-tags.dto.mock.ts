import { datatype } from 'faker'

import { ListTagsDTO } from '@/modules/common/tags/dtos'

export const mockListTagsDTO = (): ListTagsDTO => ({
  page: datatype.number(),
  records_per_page: datatype.number(),
  search: datatype.string()
})
