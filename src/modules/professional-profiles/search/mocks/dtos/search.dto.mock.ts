import { datatype } from 'faker'

export const mockSearchProfileDTO = () => ({
  search: datatype.string(),
  page: datatype.number(),
  records_per_page: datatype.number()
})
