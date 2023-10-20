import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { NotesController } from './controllers/notes.controller';
import { NotesRepository } from './repositories/notes.repository';
import { NotesService } from './services/notes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotesRepository,
      UserRepository,
      Vacancy,
      VacancyRepository
    ])
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule { }
