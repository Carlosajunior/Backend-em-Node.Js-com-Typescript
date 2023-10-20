import { queues } from '@/config/bull/bull';
import { Job } from '@/modules/common/shared/core/job';
import { Injectable } from '@nestjs/common';
import { Vacancy } from '../../entities/vacancy.entity';

export interface ExtractTagsRequest extends Vacancy {
  run_next_job?: boolean;
}

@Injectable()
export class ExtractTagsJob implements Job<Vacancy> {
  public async execute(request: ExtractTagsRequest) {
    queues.insertVacancyTagsQueue.add(request.id.toString(), {
      ...request
    });
  }
}
