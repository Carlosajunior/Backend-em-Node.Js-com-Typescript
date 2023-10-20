import { Controller, Get, NotFoundException } from '@nestjs/common';
import { PreJobInterviewService } from '../services/pre-job-interview.service';

@Controller('pre-interview')
export class PreJobInterviewController {
  constructor(private readonly preJobInterviewService: PreJobInterviewService) { }

  @Get()
  async findAll() {
    try {
      return await this.preJobInterviewService.findAll();
    } catch (error) {
      return new NotFoundException({ error: error })
    }
  }
}
