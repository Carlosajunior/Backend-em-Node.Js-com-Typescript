import { logger } from '@/modules/common/logger/client';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const handlerLog = (err) => {
      const endpoint = req.route.path
        ? req.route.path
        : req.originalUrl.split('?')[0];

      const logData = {
        body: req.body,
        baseUrl: req.baseUrl,
        params: req.params,
        headers: req.headers,
        user: req.user,
        method: req.method,
        originalUrl: req.originalUrl,
        statusCode: err?.status ? err.status : res.statusCode,
        startTime: req.startTime + '',
        endTime: new Date() + '',
        elapsedTime: Date.now() - req.startTime.getTime(),
        error: err ? JSON.stringify(err) : undefined,
        usedEndpoint: req.originalUrl.split('?')[0],
        endpoint: endpoint,
        name: req.method + ' ' + endpoint
      };

      let outLog = {
        rawData: logData
      };

      Object.keys(logData).map((key) => {
        if (typeof logData[key] === 'object') {
          const serializableObject = {};
          Object.keys(logData[key]).forEach((key2) => {
            serializableObject[`${key}-${key2}`] = logData[key][key2];
          });
          outLog = {
            ...outLog,
            ...serializableObject
          };
        } else {
          outLog = {
            ...outLog,
            [key]: logData[key]
          };
        }
      });
      logger.log(logData.name, outLog);
    };

    return next.handle().pipe(
      map((data) => {
        handlerLog(undefined);
        return data;
      }),
      catchError((err) => {
        handlerLog(err);
        return throwError(err);
      })
    );
  }
}
