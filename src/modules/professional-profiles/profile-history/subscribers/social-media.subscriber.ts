/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { SocialMedia } from '../../social-medias/entities'
import { handleProfileHistoryEvent } from '../helpers'

@Injectable()
export class SocialMediaSubscriber implements EntitySubscriberInterface<SocialMedia> {
  constructor (
    @InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return SocialMedia
  }

  async afterInsert (event: InsertEvent<SocialMedia>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionada rede social',
      `"${event.entity.type} - ${event.entity.link}"`
    )
  }

  async afterRemove (event: RemoveEvent<SocialMedia>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.databaseEntity.profile_id,
      AuditEvent.Update,
      'Removida rede social',
      `"${event.databaseEntity.type} - ${event.databaseEntity.link}"`
    )
  }
}
