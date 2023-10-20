import { Body, Controller, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Amplify } from 'aws-amplify';
import { Response } from 'express';
import { amplifyConfig } from '../config';
import { AuthDTO } from '../dto/auth.dto';
import { AuthenticateUserService } from './../services/authenticate-user.service';

Amplify.configure(amplifyConfig);
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authUserService: AuthenticateUserService) { }

  @Post()
  public async authenticate(@Res() response: Response, @Body() data: AuthDTO) {
    try {
      const res = await this.authUserService.execute(data);
      return response.status(HttpStatus.OK).send(res);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
