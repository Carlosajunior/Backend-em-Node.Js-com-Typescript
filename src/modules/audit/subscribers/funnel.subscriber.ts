/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { RequestContext } from '@/modules/common/auth/middlewares'
import Funnel from '@/modules/funnel/entities/funnel.entity'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { AuditEvent, AuditModule, FunnelFields } from '../constants'
import { getFunnelColumnName } from '../helpers'

@Injectable()
export class FunnelSubscriber implements EntitySubscriberInterface<Funnel> {
  constructor (
    @InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Funnel
  }


  async afterUpdate (event: UpdateEvent<Funnel>): Promise<void | Promise<any>> {
    const messages = []
    const old_value = {}
    const new_value = {}
    const currentUser = RequestContext.currentUser()
    event.updatedColumns.forEach((value) => {
      old_value[value.propertyName] = event.databaseEntity[value.propertyName]
      new_value[value.propertyName] = event.entity[value.propertyName]

      if (event.databaseEntity[value.propertyName] !== event.entity[value.propertyName] && event.entity[value.propertyName]) {
        if (event.databaseEntity[value.propertyName] === null) {
          messages.push(`Adicionado ${getFunnelColumnName(value.propertyName as FunnelFields)}: "${event.entity[value.propertyName]}"`)
        }

        if (event.entity[value.propertyName] === null && event.databaseEntity[value.propertyName]) {
          messages.push(`Removido "${event.databaseEntity[value.propertyName]}" do campo ${getFunnelColumnName(value.propertyName as FunnelFields)}`)
        }

        if (event.databaseEntity[value.propertyName] !== null && event.entity[value.propertyName] !== null) {
          messages.push(`Campo ${getFunnelColumnName(value.propertyName as FunnelFields)} alterado de "${event.databaseEntity[value.propertyName]}" para "${event.entity[value.propertyName]}"`)
        }
      }
    })

    if (event.updatedColumns.length > 0) {
      RequestContext.setEvent({
        user_id: currentUser.id,
        username: `${currentUser.name} ${currentUser.middle_name}`,
        user_email: currentUser.email,
        event_type: AuditEvent.Update,
        event_description: messages,
        table_name: event.metadata.tableName,
        entity_id: String(event.entity.id),
        module: AuditModule.Funnel,
        ip: currentUser.ip,
        old_value, 
        new_value,
      })
    }
  }

  async afterInsert (event: InsertEvent<Funnel>): Promise<void | Promise<any>> {
    const currentUser = RequestContext.currentUser()
    RequestContext.setEvent({
      user_id: currentUser.id,
      username: `${currentUser.name} ${currentUser.middle_name}`,
      user_email: currentUser.email,
      event_type: AuditEvent.Insert,
      event_description: ['Cadastrado funil'],
      table_name: event.metadata.tableName,
      entity_id: String(event.entity.id),
      module: AuditModule.Funnel,
      ip: currentUser.ip,
      old_value: null, 
      new_value: event.entity as unknown as Record<string, unknown>
    })
  }
}
