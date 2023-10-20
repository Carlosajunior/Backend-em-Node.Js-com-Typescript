import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { RequestContext } from '@/modules/common/auth/middlewares'

export function handlAuditEvent (entity_id: string, event_type: AuditEvent, action: string, event_description: string, table_name?: string, module?: AuditModule) {
  const profile_history = RequestContext.currentevent()
  const exists = profile_history?.event_description?.some(event => event.includes(event_description))
  if (!exists) {
    if (!profile_history) {
      const currentUser = RequestContext.currentUser()
      RequestContext.setEvent({
        user_id: currentUser.id,
        username: `${currentUser.name} ${currentUser.middle_name}`,
        user_email: currentUser.email,
        event_type,
        event_description: [`${action}: ${event_description}`],
        table_name,
        entity_id: entity_id,
        module: module || AuditModule.Customer,
        ip: currentUser.ip,
      })
    }

    if (profile_history) {
      RequestContext.setEvent({ ...profile_history, event_description: [...profile_history.event_description, `${action}: ${event_description}`] })
    }
  }

  if (exists) {
    RequestContext.setEvent({ ...profile_history, event_description: [...profile_history.event_description.filter(event => !event.includes(event_description))] })
  }
}