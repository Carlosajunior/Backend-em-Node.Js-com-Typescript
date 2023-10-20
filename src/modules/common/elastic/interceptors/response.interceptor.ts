import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { handleStorageElasticSearch } from '../helpers/storage-elasticsearch';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (context.getArgs()[0].method !== 'GET') {
          handleStorageElasticSearch(
            context.getArgs()[0].route.path,
            data
          ).catch((err) => {
            throw new BadRequestException(err);
          });
        }
        return data;
      })
    );
  }
}
