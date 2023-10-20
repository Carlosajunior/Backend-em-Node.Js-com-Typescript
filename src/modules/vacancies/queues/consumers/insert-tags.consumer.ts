import { INSERT_VACANCY_TAGS_QUEUE } from '@/config/bull/bull';
import { redisConfig } from '@/config/redis';
import { Tag } from '@/modules/common/tags/entities';
import { Job, Worker } from 'bullmq';
import { getRepository } from 'typeorm';
import { Vacancy } from '../../entities/vacancy.entity';
import { ExtractTagsRequest } from '../jobs/extract-tags.job';
import { handleVacancyCandidates } from '../jobs/handle-vacancy-candidates';

async function workerProcessFunction(job: Job) {
  const tagRepository = getRepository(Tag);
  const vacancyRepository = getRepository(Vacancy);

  const data: ExtractTagsRequest = job.data as ExtractTagsRequest;

  const { desc, requirements, desirable, advantages, title } = data;
  const conditions = await tagRepository.find();
  const text_base =
    ` ${title} ${desc} ${requirements} ${desirable} ${advantages}`.toUpperCase();
  const tags = data.tags;
  const tags_reduced: Tag[] = [];

  for (const tag of conditions) {
    const value = new RegExp(
      '\\b' + tag.name.toUpperCase().replace('++', '\\+\\+') + '\\b'
    ).test(text_base);

    if (value && !tag.to_approve) tags.push(tag);
  }

  tags.forEach((tag) => {
    const duplicated =
      tags_reduced?.findIndex((redItem) => {
        return redItem.id === tag.id;
      }) > -1;

    if (!duplicated) {
      tags_reduced.push(tag);
    }
  });

  const updatedVacancy = await vacancyRepository.save(data);
  if (data?.run_next_job) handleVacancyCandidates(updatedVacancy);
}

new Worker(INSERT_VACANCY_TAGS_QUEUE, workerProcessFunction, {
  connection: redisConfig.redis,
  concurrency: 1
});
