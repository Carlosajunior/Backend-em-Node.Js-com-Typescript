import { EntityRepository, Repository } from 'typeorm';
import { PostJobInterview } from '../entities/post-job-interview.entity';

@EntityRepository(PostJobInterview)
export class PostJobInterviewRepository extends Repository<PostJobInterview> {
  async findAll() {
    return await this.find({
      order: {
        index: 'ASC'
      }
    });
  }
}
