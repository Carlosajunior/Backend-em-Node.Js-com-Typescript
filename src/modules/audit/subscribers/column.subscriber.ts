/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { RequestContext } from '@/modules/common/auth/middlewares'
import { Columns } from '@/modules/funnel/columns/entities'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm'
import { handlAuditEvent } from '../helpers'
import {AuditRepository } from '../repositories'

@Injectable()
export class ColumnsSubscriber implements EntitySubscriberInterface<Columns> {
  constructor (
    @InjectConnection() readonly connection: Connection,
    private readonly auditRepository: AuditRepository,
  ) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Columns
  }

  async afterInsert (event: InsertEvent<Columns>): Promise<void | Promise<any>> {
    handlAuditEvent(
      event.entity.id,
      AuditEvent.Update,
      `Adicionado coluna`,
      `"${event.entity.name}"`,
      event.metadata.tableName,
      AuditModule.Funnel
    )
  }

  async afterRemove (): Promise<void | Promise<any>> {
    const column_id = RequestContext.currentRequest().params.id
    const name = RequestContext.currentRequest().body.name
    handlAuditEvent(
      column_id,
      AuditEvent.Update,
      `Removido coluna`,
      `"${name}"`,
      'columns',
      AuditModule.Funnel
    )

    const profile_history = RequestContext.currentProfileHistory()
    if (profile_history) {
      this.auditRepository.createAudit(profile_history)
    }
  }
}
