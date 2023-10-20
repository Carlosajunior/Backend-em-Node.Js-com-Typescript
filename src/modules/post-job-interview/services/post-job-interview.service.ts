import { Injectable, NotFoundException } from '@nestjs/common';
import { PostJobInterviewRepository } from '../repositories/post-job-interview.repository';

@Injectable()
export class PostJobInterviewService {
  constructor(private readonly postJobInterviewRepository: PostJobInterviewRepository) { }

  async findAll() {
    try {
      return await this.postJobInterviewRepository.findAll()
    } catch (error) {
      return new NotFoundException({ error: error })
    }
  }

}
