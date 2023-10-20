import { DefaultModel } from '@/modules/common/shared/models'
import { AuditEvent, AuditModule } from '../constants'

export type AuditModel = DefaultModel & {
  event_type: AuditEvent
  user_id: string
  username: string
  user_email: string
  event_description: string[]
  table_name?: string
  entity_id?: string
  ip: string
  module: AuditModule
  old_value?: Record<string, unknown>
  new_value?: Record<string, unknown>
}
