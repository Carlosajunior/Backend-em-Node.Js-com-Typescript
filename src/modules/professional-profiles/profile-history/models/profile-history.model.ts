import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { DefaultModel } from '@/modules/common/shared/models'
import { ProfileHistoryEvent } from '../constants'

export type ProfileHistoryModel = DefaultModel & {
  event_type: AuditEvent | ProfileHistoryEvent
  user_id: string
  username: string
  user_email: string
  event_description: string[]
  table_name: string
  entity_id: string
  ip: string
  module: AuditModule
  old_value: Record<string, unknown>
  new_value: Record<string, unknown>
}

