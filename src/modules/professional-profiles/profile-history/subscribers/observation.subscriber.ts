/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent, AuditModule } from '@/modules/audit/constants';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent
} from 'typeorm';
import { Observation } from '../../observations/entities';
import { handleProfileHistoryEvent } from '../helpers';

@Injectable()
export class ObservationSubscriber
  implements EntitySubscriberInterface<Observation>
{
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return Observation;
  }

  async afterInsert(
    event: InsertEvent<Observation>
  ): Promise<void | Promise<any>> {
    handleProfileHistoryEvent(
     event.entity.profile_id,
      AuditEvent.Update,
      'Adicionada observação',
      `"${event.entity.note}"`,
      'profile',
      AuditModule.Professional
    );
  }

  async afterRemove(
    event: RemoveEvent<Observation>
  ): Promise<void | Promise<any>> {
    if (event.entity) {
      handleProfileHistoryEvent(
        event.entity.profile_id,
        AuditEvent.Delete,
        'Removida observação',
        `"${event.databaseEntity.note}"`,
        'profile',
       AuditModule.Professional
      );
    }
  }
}