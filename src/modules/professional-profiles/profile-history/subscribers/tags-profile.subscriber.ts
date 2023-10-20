/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { TagsToProfile } from '@/modules/common/tags/entities'
import { TagsRepository } from '@/modules/common/tags/repositories'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { handleProfileHistoryEvent } from '../helpers'

@Injectable()
export class TagsToProfileSubscriber implements EntitySubscriberInterface<TagsToProfile> {
  constructor(
    @InjectConnection() readonly connection: Connection, private readonly tagsRepository?: TagsRepository) {
    connection.subscribers.push(this)
  }

  listenTo(): any {
    return TagsToProfile
  }

  async afterInsert(event: InsertEvent<TagsToProfile>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionada competência',
      `"${event.entity.tag?.name}${event.entity.experience_time ? ' - ' + event.entity.experience_time : ''}"`
    )
  }

  async afterRemove(event: RemoveEvent<TagsToProfile>): Promise<void | Promise<any>> {
    const tag = await this.tagsRepository.findOne({ id: event.databaseEntity.tag_id })
    handleProfileHistoryEvent(
      event.databaseEntity.profile_id,
      AuditEvent.Update,
      'Removida competência',
      `"${tag?.name}${event.databaseEntity.experience_time ? ' - ' + event.databaseEntity.experience_time : ''}"`

    )
  }
}
