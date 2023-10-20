import { INSERT_CANDIDATE_QUEUE_NAME } from '@/config/bull/bull';
import { elasticsearchService } from '@/config/elasticseach';
import { redisConfig } from '@/config/redis';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { Job, Worker } from 'bullmq';
import { getRepository, IsNull, Not } from 'typeorm';
import { Vacancy } from '../../entities/vacancy.entity';

const workerProcessFunction = async (job: Job) => {
  const observationRespository = getRepository(Observation);
  const MIN_ADHESION = 50;
  const jobData: { vacancy: Vacancy; profile: Profile } = job.data;
  const { profile, vacancy } = jobData;
  let tags_of_professionals_in_vacancy = 0;

  profile.tags.forEach((profile_tag) => {
    if (
      vacancy.tags.find((vacancy_tag) => vacancy_tag.id === profile_tag.tag_id)
    ) {
      tags_of_professionals_in_vacancy++;
    }
  });

  const adhesion = Math.round(
    (tags_of_professionals_in_vacancy / vacancy.tags.length) * 100
  );

  if (adhesion >= MIN_ADHESION) {
    /**
     * candidatos que já estão em alguma coluna, de qualquer funil
     */
    const existings = await observationRespository.count({
      where: {
        profile_id: profile.id,
        column_id: Not(IsNull())
      }
    });

    if (!existings) {
      // const randomUser =  users[Math.floor(Math.random() * users.length)];
      const observation = observationRespository.create({
        note: `Candidato atrelado automaticamente à vaga "${vacancy.title}".`,
        vacancy_id: String(vacancy.id),
        profile_id: profile.id,
        identify: vacancy.identify,
        contact_date: new Date(),
        status: vacancy.status,
        profile,
        column_id: null
      });
      const savedObs = await observationRespository.save(observation);
      profile.observations.forEach(observation => delete observation.profile)
      delete savedObs.profile
        await elasticsearchService.update({
          index: 'profile',
          id: profile.id,
          retry_on_conflict: 1,
          doc: {
            observations: [...(profile?.observations || []), savedObs]
          }
        });
    }
  }
};

new Worker(INSERT_CANDIDATE_QUEUE_NAME, workerProcessFunction, {
  connection: redisConfig.redis,
  concurrency: 1
});
