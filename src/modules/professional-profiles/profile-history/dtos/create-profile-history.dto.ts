import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { IsEnum } from 'class-validator'
export class CreateProfileHistoryDTO {
  @IsEnum(AuditEvent)
  event_type: AuditEvent

  event_description: string[]

  user_id: string

  username: string

  user_email: string

  table_name: string

  entity_id: string

  ip: string
  
  @IsEnum(AuditModule)
  module: AuditModule

  old_value: Record<string, unknown>

  new_value: Record<string, unknown>
}
