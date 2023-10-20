import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { BadRequestException, Body, Controller, Get, HttpCode, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateLoggedUserDTO } from '../dtos/update-logged-user.dto';
import { ShowLoggedUserService } from '../services/show-logged-user.service';
import { UpdateLoggedUserService } from '../services/update-logged-user.service';

@Controller('users/me')
@ApiTags('logged user')
export class LoggedUserController {
  public constructor(
    private readonly decodeToken: DecodeTokenService,
    private readonly showLoggedUser: ShowLoggedUserService,
    private readonly updateLoggedUser: UpdateLoggedUserService
  ) { }

  @Get()
  @HttpCode(200)
  public async show(@Req() request: Request) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];
      const decodedToken = this.decodeToken.execute(token);
      return await this.showLoggedUser.execute(decodedToken);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Put()
  @HttpCode(201)
  public async update(
    @Body() data: UpdateLoggedUserDTO,
    @Req() request: Request
  ) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const decodedToken = this.decodeToken.execute(token);

      await this.updateLoggedUser.execute({
        ...data,
        token_payload: decodedToken
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
