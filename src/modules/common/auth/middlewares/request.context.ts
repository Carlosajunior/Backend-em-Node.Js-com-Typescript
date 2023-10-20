import { HttpException, HttpStatus } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { Request, Response } from 'express';
export class RequestContext {
  public static nsid = '@cognito_token';
  public readonly id: number;
  public request: Request;
  public response: Response;

  constructor(request: Request, response: Response) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  public static currentRequestContext(): RequestContext {
    const session = cls.getNamespace(RequestContext.nsid);
    if (session && session.active) {
      return session.get(RequestContext.name);
    }

    return null;
  }

  public static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request;
    }

    return null;
  }

  public static currentUser(throwError?: boolean) {
    const requestContext = RequestContext.currentRequestContext();

    if (!requestContext && throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = requestContext?.request.user;

    return user;
  }


  public static currentUserFormatted(throwError?: boolean) {
    const requestContext = RequestContext.currentRequestContext();

    if (!requestContext && throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = requestContext?.request.user;
    return `${user.name} ${user.middle_name}`
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  }

  public static setProfileHistoryData(historyData: any): any {
    const requestContext = RequestContext.currentRequestContext();

    requestContext.request.profile_history = historyData;

    return null;
  }



  public static setProfileID(profile_id: string) {
    const requestContext = RequestContext.currentRequestContext();
    requestContext.request.profile_id = profile_id;
    return null;
  }

  public static currentProfileId(throwError?: boolean): any {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      const profile_id: any = requestContext.request.profile_id;
      if (profile_id) {
        return profile_id;
      }
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }

  public static currentevent(throwError?: boolean): any {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      const event: any = requestContext.request.event;
      if (event) {
        return event;
      }
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }

  public static currentProfileHistory(throwError?: boolean): any {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      const profile_history: any = requestContext.request.profile_history;
      if (profile_history) {
        return profile_history;
      }
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }
}