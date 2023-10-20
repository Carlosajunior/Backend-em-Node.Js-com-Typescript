/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { Reference } from '../../references/entities'
import { handleProfileHistoryEvent } from '../helpers'

@Injectable()
export class ReferenceSubscriber implements EntitySubscriberInterface<Reference> {
  constructor (
    @InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Reference
  }

  async afterInsert (event: InsertEvent<Reference>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionada referência',
      `"${event.entity.description} - ${event.entity.link}"`
    )
  }

  async afterRemove (event: RemoveEvent<Reference>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.databaseEntity.profile_id,
      AuditEvent.Update,
      'Removida referência',
      `"${event.databaseEntity.description} - ${event.databaseEntity.link}"`
    )
  }
}
