/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { RequestContext } from '@/modules/common/auth/middlewares'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { Profile } from '../../profiles/entities'
import { ProfileFields } from '../constants'
import { getColumnName } from '../helpers'
import { ProfilesHistoryRepository } from '../repositories'

@Injectable()
export class ProfileSubscriber implements EntitySubscriberInterface<Profile> {
  constructor (
    @InjectConnection() readonly connection: Connection, private readonly profilesHistoryRepository: ProfilesHistoryRepository) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Profile
  }

  async afterUpdate (event: UpdateEvent<Profile>): Promise<void | Promise<any>> {
    const messages = []
    const old_value = {}
    const new_value = {}
    const currentUser = RequestContext.currentUser()
    event.updatedColumns.forEach((value) => {
      old_value[value.propertyName] = event.databaseEntity[value.propertyName]
      new_value[value.propertyName] = event.entity[value.propertyName]
      if (event.databaseEntity[value.propertyName] !== event.entity[value.propertyName]) {
        if (event.databaseEntity[value.propertyName] === null) {
          messages.push(`Adicionado ${getColumnName(value.propertyName as ProfileFields)}: "${event.entity[value.propertyName]}"`)
        }

        if (event.entity[value.propertyName] === null) {
          messages.push(`Removido "${event.databaseEntity[value.propertyName]}" do campo ${getColumnName(value.propertyName as ProfileFields)}`)
        }

        if (event.databaseEntity[value.propertyName] !== null && event.entity[value.propertyName] !== null) {
          messages.push(`Campo ${getColumnName(value.propertyName as ProfileFields)} alterado de "${event.databaseEntity[value.propertyName]}" para "${event.entity[value.propertyName]}"`)
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
        entity_id: event.entity.id,
        module: AuditModule.Professional,
        ip: currentUser.ip,
        old_value, 
        new_value,
      })
    }
  }

  async afterInsert (event: InsertEvent<Profile>): Promise<void | Promise<any>> {
    const currentUser = RequestContext.currentUser()
    RequestContext.setEvent({
      user_id: currentUser.id,
      username: `${currentUser.name} ${currentUser.middle_name}`,
      user_email: currentUser.email,
      event_type: AuditEvent.Insert,
      event_description: ['Cadastrado perfil profissional'],
      table_name: event.metadata.tableName,
      entity_id: event.entity.id,
      module: AuditModule.Professional,
      ip: currentUser.ip,
      old_value: null, 
      new_value: event.entity as unknown as Record<string, unknown>
    })
  }
}