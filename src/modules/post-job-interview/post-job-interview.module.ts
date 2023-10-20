import { Module } from '@nestjs/common';
import { PostJobInterviewService } from './services/post-job-interview.service';
import { PostJobInterviewController } from './controllers/post-job-interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostJobInterviewRepository } from './repositories/post-job-interview.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    PostJobInterviewRepository,
  ])],
  controllers: [PostJobInterviewController],
  providers: [PostJobInterviewService]
})
export class PostJobInterviewModule { }
