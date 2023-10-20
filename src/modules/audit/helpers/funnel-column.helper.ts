import { FunnelFields } from '@/modules/audit/constants'

export const getFunnelColumnName = (column: FunnelFields) => {
  switch (column) {
    case FunnelFields.name:
      return 'nome'
    case FunnelFields.status:
      return 'status'
  }
}
