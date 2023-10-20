import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { SquadController } from './controllers/squad.controller';
import { Squad } from './entities/squad.entity';
import { SquadRepository } from './repositories/squad.repository';
import { SquadsService } from './services/squads.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    SquadRepository,
    UserRepository,
    Squad
  ])],
  controllers: [SquadController],
  providers: [SquadsService]
})
export class SquadModule { }
