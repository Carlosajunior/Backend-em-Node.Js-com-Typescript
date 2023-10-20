import { elasticsearchService } from '@/config/elasticseach';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { AuditEvent, AuditModule } from '../constants';
import { Audit } from '../entities';

@Injectable()
export class AuditSubscriber implements EntitySubscriberInterface<Audit> {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Audit;
  }

  public async afterInsert(event: InsertEvent<Audit>) {
    const createdAudit = event.entity;

    if (createdAudit.module === AuditModule.Professional) {
      switch (createdAudit.event_type) {
        case AuditEvent.Access: {
          elasticsearchService.update({
            index: ElasticSearchIndex.profile,
            retry_on_conflict: 1,
            id: createdAudit.entity_id,
            doc: {
              last_seen_at: createdAudit.created_at,
              last_seen_by: createdAudit.username
            }
          });

          break;
        }
        default:
          break;
      }
    }
  }
}
