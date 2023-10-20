/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { RequestContext } from '@/modules/common/auth/middlewares';
import { Message } from '@/modules/messages/entities/message.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { AuditEvent, AuditModule } from '../constants';

@Injectable()
export class MessageSubscriber implements EntitySubscriberInterface<Message> {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Message;
  }

  async afterInsert(event: InsertEvent<Message>): Promise<void | Promise<any>> {
    const currentUser = RequestContext.currentUser();

    RequestContext.setEvent({
      user_id: currentUser.id,
      username: `${currentUser.name} ${currentUser.middle_name}`,
      user_email: currentUser.email,
      event_type: AuditEvent.Insert,
      event_description: ['Enviada mensagem'],
      table_name: event.metadata.tableName,
      entity_id: String(event.entity.id),
      module: AuditModule.Message,
      ip: currentUser.ip,
      old_value: null,
      new_value: event.entity as unknown as Record<string, unknown>
    });
  }
}
