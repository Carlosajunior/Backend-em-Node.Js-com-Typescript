/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { Formation } from '../../formations/entities'
import { handleProfileHistoryEvent } from '../helpers'

@Injectable()
export class FormationSubscriber implements EntitySubscriberInterface<Formation> {
  constructor (
    @InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Formation
  }

  async afterInsert (event: InsertEvent<Formation>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionada formação',
      `"${event.entity.course} na ${event.entity.institution} - ${event.entity.initial_date} - ${event.entity.end_date || 'Atualmente'}"`
    )
  }

  async afterRemove (event: RemoveEvent<Formation>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.databaseEntity.profile_id,
      AuditEvent.Update,
      'Removida formação',
      `"${event.databaseEntity.course} na ${event.databaseEntity.institution} - ${event.databaseEntity.initial_date} - ${event.databaseEntity.end_date || 'Atualmente'}"`

    )
  }
}
