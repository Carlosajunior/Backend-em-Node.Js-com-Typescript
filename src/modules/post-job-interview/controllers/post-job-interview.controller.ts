import { Controller, Get, NotFoundException } from '@nestjs/common';
import { PostJobInterviewService } from '../services/post-job-interview.service';

@Controller('post-interview')
export class PostJobInterviewController {
  constructor(private readonly postJobInterviewService: PostJobInterviewService) { }

  @Get()
  async findAll() {
    try {
      return await this.postJobInterviewService.findAll();
    } catch (error) {
      return new NotFoundException({ error: error })
    }
  }

}
