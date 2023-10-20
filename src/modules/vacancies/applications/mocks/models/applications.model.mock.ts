import { datatype } from 'faker'
import { ApplyDTO } from '../../dtos'

export const mockApplicationsModel = (): ApplyDTO => ({
  vacancy_id: datatype.number(),
  records_per_page: datatype.number(),
  page: datatype.number()
})
