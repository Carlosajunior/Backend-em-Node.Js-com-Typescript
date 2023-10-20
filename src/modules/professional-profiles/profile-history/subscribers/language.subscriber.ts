/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { Language } from '../../languages/entities'
import { handleProfileHistoryEvent } from '../helpers'

@Injectable()
export class LanguageSubscriber implements EntitySubscriberInterface<Language> {
  constructor (
    @InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Language
  }

  async afterInsert (event: InsertEvent<Language>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionado idioma',
      `"${event.entity.language} - ${event.entity.level}"`
    )
  }

  async afterRemove (event: RemoveEvent<Language>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.databaseEntity.profile_id,
      AuditEvent.Update,
      'Removido idioma',
      `"${event.databaseEntity.language} - ${event.databaseEntity.level}"`
    )
  }
}
