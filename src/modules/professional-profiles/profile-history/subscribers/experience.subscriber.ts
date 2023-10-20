/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { Experience } from '../../experiences/entities'
import { handleProfileHistoryEvent } from '../helpers'

@Injectable()
export class ExperienceSubscriber implements EntitySubscriberInterface<Experience> {
  constructor (
    @InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Experience
  }

  async afterInsert (event: InsertEvent<Experience>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionada experiência',
      `"${event.entity.position} na ${event.entity.company} - ${event.entity.initial_date} - ${event.entity.end_date || 'Atualmente'}"`
    )
  }

  async afterRemove (event: RemoveEvent<Experience>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.databaseEntity.profile_id,
      AuditEvent.Update,
      'Removida experiência',
      `"${event.databaseEntity.position} na ${event.databaseEntity.company} - ${event.databaseEntity.initial_date} - ${event.databaseEntity.end_date || 'Atualmente'}"`

    )
  }
}
