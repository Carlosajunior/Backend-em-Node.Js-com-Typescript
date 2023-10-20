import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecodeTokenService } from '../common/auth/services/decode-token.service';
import { CreateCognitoUserService } from '../common/cognito/services/create-cognito-user.service';
import { FindCognitoUserService } from '../common/cognito/services/find-cognito-user.service';
import { UpdateCognitoUserService } from '../common/cognito/services/update-cognito-user.service';
import { FirstAccessController } from './controllers/first-access.controller';
import { LoggedUserController } from './controllers/logged-user.controller';
import { UserGroupsController } from './controllers/user-groups.controller';
import { UserStatusController } from './controllers/user-status.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { ChangeUserStatusService } from './services/change-user-status.service';
import { CreateUserOnFirstAccessByTokenPayloadService } from './services/create-user-on-first-access-by-token-payload.service';
import { CreateUserService } from './services/create-user.service';
import { CreateUsersInBulkService } from './services/create-users-in-bulk.service';
import { GetUserByIdService } from './services/get-user-by-id.service';
import { ListUsersGroupsService } from './services/list-users-groups.service';
import { ListUsersService } from './services/list-users.service';
import { ShowLoggedUserService } from './services/show-logged-user.service';
import { UpdateLoggedUserService } from './services/update-logged-user.service';
import { UpdateUserService } from './services/update-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [
    FirstAccessController,
    LoggedUserController,
    UserController,
    UserGroupsController,
    UserStatusController
  ],
  providers: [
    ChangeUserStatusService,
    CreateCognitoUserService,
    CreateUsersInBulkService,
    CreateUserOnFirstAccessByTokenPayloadService,
    CreateUserService,
    DecodeTokenService,
    FindCognitoUserService,
    GetUserByIdService,
    ListUsersService,
    ListUsersGroupsService,
    ShowLoggedUserService,
    UpdateCognitoUserService,
    UpdateLoggedUserService,
    UpdateUserService
  ]
})
export class UserModule {}
