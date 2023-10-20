import { elasticsearchService } from '@/config/elasticseach';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { subHours } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { AuditModule } from '../constants';
import { Audit } from '../entities';

export interface Response<T> {
  data: T;
}

@Injectable()
export class AuditInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const event = context.getArgs()[0]?.event;
        if (event && event?.event_description?.length > 0) {
          const created_event = getRepository(Audit).create(
            event
          ) as unknown as Audit;
          getRepository(Audit)
            .save(created_event)
            .then((response) => {
              const { username, table_name, module, creator_id } = response;
              const updated_at = response.updated_at;
              if (
                table_name === 'profile' &&
                module === AuditModule.Professional
              ) {
                getRepository(Profile).update(event.entity_id, {
                  updated_at,
                  updated_by: username,
                  creator_id
                });
                elasticsearchService.update({
                  index: ElasticSearchIndex.profile,
                  id: event.entity_id,
                  retry_on_conflict: 1,
                  doc: {
                    creator_id,
                    updated_at,
                    updated_by: username
                  }
                });
              }
            });
        }
        return data;
      })
    );
  }
}
