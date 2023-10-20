import { Injectable, NotFoundException } from '@nestjs/common';
import { PreJobInterviewRepository } from '../repositories/pre-job-interview.repository';

@Injectable()
export class PreJobInterviewService {
  constructor(private readonly preJobInterviewRepository: PreJobInterviewRepository) { }

  async findAll() {
    try {
      return await this.preJobInterviewRepository.findAll()
    } catch (error) {
      return new NotFoundException({ error: error })
    }
  }

}
