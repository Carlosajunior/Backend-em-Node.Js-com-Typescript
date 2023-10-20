import { queues } from '@/config/bull/bull';
import { MessagesToProfile } from '@/modules/messages/entities/message-to-profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';

@Injectable()
export class MessagesToProfileSubscriber
  implements EntitySubscriberInterface<MessagesToProfile>
{
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return MessagesToProfile;
  }

  async afterInsert(event: InsertEvent<MessagesToProfile>) {
    queues.insertProfileLastMessageQueue.add(event.entity.id, event.entity);
  }
}
