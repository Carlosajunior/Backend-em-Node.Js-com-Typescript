import { queues } from '@/config/bull/bull';
import { Job } from '@/modules/common/shared/core/job';
import { Injectable } from '@nestjs/common';
import { LanguageDTO } from '../../dtos/language.dto';

export interface UpdateVacancyLanguagesJobRequest {
  langs?: LanguageDTO[];
  vacancy_id: number;
}
@Injectable()
export class UpdateVacancyLanguagesJob
  implements Job<UpdateVacancyLanguagesJobRequest>
{
  public async execute(data: UpdateVacancyLanguagesJobRequest): Promise<void> {
    queues.updateVacancyLangsQueue.add(data.vacancy_id.toString(), {
      ...data
    });
  }
}
