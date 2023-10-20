import { DefaultModel } from '@/modules/common/shared/models'
import { Observation } from '@/modules/professional-profiles/observations/entities'
import Funnel from '../../entities/funnel.entity'

export type ColumnsModel = DefaultModel & {
  name: string,
  preinterview?: boolean
  postinterview?: boolean
  index?: number
  funnelId: string
  observations?: Observation[]
  total?: number,
  funnel: Funnel
}
