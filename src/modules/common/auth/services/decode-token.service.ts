import { BadRequestException, Injectable } from '@nestjs/common';
import { Service } from '../../shared/core/service';
import { TokenDecode } from '../helpers/token-decode.helper';
import { TokenPayload } from '../models/token-payload.model';

@Injectable()
export class DecodeTokenService implements Service<string, TokenPayload> {
  public execute(token?: string): TokenPayload {
    if (!token) throw new BadRequestException('Token não apresentado.');
    return TokenDecode.decode(token);
  }
}
