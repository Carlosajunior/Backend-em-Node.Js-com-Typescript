import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { Controller, HttpCode, InternalServerErrorException, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserOnFirstAccessByTokenPayloadService } from '../services/create-user-on-first-access-by-token-payload.service';

@Controller('users/first-access')
@ApiTags('users')
export class FirstAccessController {
  private readonly decodeToken: DecodeTokenService;
  private readonly createUserOnFirstAccessByTokenPayload: CreateUserOnFirstAccessByTokenPayloadService;

  public constructor(decodeToken: DecodeTokenService) {
    this.decodeToken = decodeToken;
  }

  @Post()
  @HttpCode(201)
  public async create(@Req() request: Request) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const decodedToken = this.decodeToken.execute(token);

      await this.createUserOnFirstAccessByTokenPayload.execute(decodedToken);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
