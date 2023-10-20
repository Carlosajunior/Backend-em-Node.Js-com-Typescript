import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ListUsersDTO } from '../dtos/list-users.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { GetUserByIdService } from '../services/get-user-by-id.service';
import { ListUsersService } from '../services/list-users.service';
import { UpdateUserService } from '../services/update-user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly createUser: CreateUserService;
  private readonly getUserById: GetUserByIdService;
  private readonly listUsers: ListUsersService;
  private readonly updateUser: UpdateUserService;

  public constructor(
    createUser: CreateUserService,
    getUserById: GetUserByIdService,
    listUsers: ListUsersService,
    updateUser: UpdateUserService
  ) {
    this.createUser = createUser;
    this.getUserById = getUserById;
    this.listUsers = listUsers;
    this.updateUser = updateUser;
  }

  @Get()
  @HttpCode(200)
  public async index(@Query() query: ListUsersDTO) {
    try {
      return await this.listUsers.execute(query);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: CreateUserDTO) {
    try {
      await this.createUser.execute(data);
      return;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get(':id')
  @HttpCode(200)
  public async show(@Param('id') id: string) {
    try {
      return await this.getUserById.execute(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Put(':id')
  @HttpCode(201)
  public async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    try {
      return await this.updateUser.execute({ ...data, id });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
