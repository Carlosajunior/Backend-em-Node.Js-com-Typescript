import { UPDATE_VACANCY_LANGS_QUEUE } from '@/config/bull/bull';
import { redisConfig } from '@/config/redis';
import { Job, Worker } from 'bullmq';
import { getRepository } from 'typeorm';
import { VacancyLanguage } from '../../entities/vacancy_languages.entity';
import { UpdateVacancyLanguagesJobRequest } from '../jobs/update-vacancy-languages.job';

async function workerProcessFunction(job: Job) {
  const vacancyLanguagesRepository = getRepository(VacancyLanguage);

  const data: UpdateVacancyLanguagesJobRequest =
    job.data as UpdateVacancyLanguagesJobRequest;

  await vacancyLanguagesRepository
    .createQueryBuilder()
    .delete()
    .from(VacancyLanguage)
    .where('vacancy_id = :id', { id: data.vacancy_id })
    .execute();

  if (data?.langs?.length > 0) {
    for (const lang of data.langs) {
      await vacancyLanguagesRepository.save(
        vacancyLanguagesRepository.create({
          level: lang.level,
          language_id: lang.id,
          vacancy_id: data.vacancy_id
        })
      );
    }
  }
}

new Worker(UPDATE_VACANCY_LANGS_QUEUE, workerProcessFunction, {
  connection: redisConfig.redis,
  concurrency: 1
});
