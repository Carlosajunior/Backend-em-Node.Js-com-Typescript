import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenDecode } from '../helpers/token-decode.helper';
import { TokenPayload } from '../models/token-payload.model';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const groups = this.reflector.get<AccessProfiles[]>(
      'groups',
      context.getHandler()
    );
    if (!groups) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')[1];

    const tokenPayload = TokenDecode.decode<TokenPayload>(token);

    return groups?.some((group) =>
      tokenPayload?.['cognito:groups']?.includes(group)
    );
  }
}
