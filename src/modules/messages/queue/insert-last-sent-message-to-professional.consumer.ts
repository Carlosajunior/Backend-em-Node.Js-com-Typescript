import { INSERT_PROFILE_LAST_MESSAGE_QUEUE } from '@/config/bull/bull';
import { elasticsearchService } from '@/config/elasticseach';
import { redisConfig } from '@/config/redis';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { Job, Worker } from 'bullmq';
import { MessagesToProfile } from '../entities/message-to-profile.entity';

async function workerProcessFunction({ data }: Job<MessagesToProfile>) {
  await elasticsearchService.update({
    index: ElasticSearchIndex.profile,
    id: data.profile_id,
    retry_on_conflict: 1,
    doc: {
      last_message: data
    }
  });
}

new Worker(INSERT_PROFILE_LAST_MESSAGE_QUEUE, workerProcessFunction, {
  connection: redisConfig.redis,
  concurrency: 1
});
