import { Module } from '@nestjs/common';
import { AnswersService } from './services/answers.service';
import { AnswersController } from './controllers/answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersRepository } from './repositories/answers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    AnswersRepository
  ])],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule { }
