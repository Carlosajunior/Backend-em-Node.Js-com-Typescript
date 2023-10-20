import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';
import { AlternativesRepository } from '../alternatives/repositories/alternatives.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersRepository } from '../answers/repositories/answers.repository';
import { QuestionsRepository } from './repositories/questions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    AlternativesRepository,
    AnswersRepository,
    QuestionsRepository
  ])],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule { }
