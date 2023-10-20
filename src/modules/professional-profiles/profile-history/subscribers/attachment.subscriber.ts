/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { RequestContext } from '@/modules/common/auth/middlewares'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm'
import { Attachment } from '../../attachments/entities'
import { handleProfileHistoryEvent } from '../helpers'
import { ProfilesHistoryRepository } from '../repositories'

@Injectable()
export class AttachmentSubscriber implements EntitySubscriberInterface<Attachment> {
  constructor (
    @InjectConnection() readonly connection: Connection,
    private readonly profilesHistoryRepository: ProfilesHistoryRepository
  ) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Attachment
  }

  async afterInsert (event: InsertEvent<Attachment>): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
      event.entity.profile_id,
      AuditEvent.Update,
      'Adicionado anexo',
      `"${event.entity.name}"`
    )
  }

  async afterRemove (): Promise<void | Promise<any>> {
    const profile_id = RequestContext.currentRequest().body.profile_id
    const name = RequestContext.currentRequest().body.name
    handleProfileHistoryEvent(
      profile_id,
      AuditEvent.Update,
      'Removido anexo',
      `"${name}"`
    )

    const profile_history = RequestContext.currentProfileHistory()
    if (profile_history) {
      this.profilesHistoryRepository.createProfileHistory(profile_history)
    }
  }
}
