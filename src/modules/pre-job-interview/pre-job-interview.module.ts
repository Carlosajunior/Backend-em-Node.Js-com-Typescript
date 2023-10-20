import { Module } from '@nestjs/common';
import { PreJobInterviewService } from './services/pre-job-interview.service';
import { PreJobInterviewController } from './controllers/pre-job-interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreJobInterviewRepository } from './repositories/pre-job-interview.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    PreJobInterviewRepository,
  ])],
  controllers: [PreJobInterviewController],
  providers: [PreJobInterviewService]
})
export class PreJobInterviewModule { }
