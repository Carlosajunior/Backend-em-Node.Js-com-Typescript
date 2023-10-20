import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    req.startTime = new Date();
    next();
  }
}
