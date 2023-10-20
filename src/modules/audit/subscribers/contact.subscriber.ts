/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent } from '@/modules/audit/constants'
import { RequestContext } from '@/modules/common/auth/middlewares'
import Contact from '@/modules/customers/contact/entities/contact.entity'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { handlAuditEvent } from '../helpers'
import {AuditRepository } from '../repositories'

@Injectable()
export class ContactSubscriber implements EntitySubscriberInterface<Contact> {
  constructor (
    @InjectConnection() readonly connection: Connection,
    private readonly auditRepository: AuditRepository
  ) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Contact
  }

  async afterInsert (event: InsertEvent<Contact>): Promise<void | Promise<any>> {
    handlAuditEvent(
      event.entity.id,
      AuditEvent.Update,
      `Adicionado contato`,
      `"${event.entity.name}"`,
      event.metadata.tableName
    )
  }

  async afterUpdate(event: UpdateEvent<Contact>): Promise<void | Promise<any>> {
    const customer_id = RequestContext.currentRequest().params.id
    const name = RequestContext.currentRequest().body.name
    handlAuditEvent(
      customer_id,
      AuditEvent.Update,
      'Removido contato do cliente',
      `"${name}"`,
      event.metadata.tableName
    )
  }

  async afterRemove (): Promise<void | Promise<any>> {
    const customer_id = RequestContext.currentRequest().params.id
    const name = RequestContext.currentRequest().body.name
    handlAuditEvent(
      customer_id,
      AuditEvent.Update,
      `Removido contato do cliente`,
      `"${name}"`,
      'contact'
    )

    const profile_history = RequestContext.currentProfileHistory()
    if (profile_history) {
      this.auditRepository.createAudit(profile_history)
    }
  }
}
