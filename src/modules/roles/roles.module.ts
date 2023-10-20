import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from '../roles/services/roles.service';
import { UserRepository } from '../users/repositories/user.repository';
import { RolesController } from './controllers/roles.controller';
import { RolesRepository } from './repositories/roles.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolesRepository,
      UserRepository
    ])
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule { }
