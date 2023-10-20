import { redisConfig } from '@/config/redis';
import { MessagesToProfile } from '@/modules/messages/entities/message-to-profile.entity';
import { SendMessage } from '@/modules/messages/models/send-message.model';
import { createBullBoard } from 'bull-board';
import { BullMQAdapter } from 'bull-board/bullMQAdapter';
import { Job, Queue } from 'bullmq';

const { router, addQueue } = createBullBoard([]);

export const createQueue = (queue_name: string) => {
  const queue = new Queue(queue_name, { connection: redisConfig.redis });
  addQueue(new BullMQAdapter(queue));

  queue.on('progress', (job: Job) => {
    console.log(`Processing job ${job.id}`);
  });

  queue.on('error', (err: Error) => {
    console.log(`Error on process job with id ${err}`);
  });

  return queue;
};

export const SEND_MESSAGE_QUEUE_NAME = 'sendMessage';
const sendMessageQueue: Queue<SendMessage> = createQueue(
  SEND_MESSAGE_QUEUE_NAME
);

export const INSERT_CANDIDATE_QUEUE_NAME = 'insert-candidate-into-vacancy';
const insertCandidateIntoVacancyQueue = createQueue(
  INSERT_CANDIDATE_QUEUE_NAME
);

export const INSERT_PROFILE_LAST_MESSAGE_QUEUE =
  'insert-profile-last-message-queue';
const insertProfileLastMessageQueue: Queue<MessagesToProfile> = createQueue(
  INSERT_PROFILE_LAST_MESSAGE_QUEUE
);

export const INSERT_VACANCY_TAGS_QUEUE = 'insert-vacancy-tag-queue';
const insertVacancyTagsQueue = createQueue(INSERT_VACANCY_TAGS_QUEUE);

export const UPDATE_VACANCY_LANGS_QUEUE = 'update-vacancy-langs-queue';
const updateVacancyLangsQueue = createQueue(UPDATE_VACANCY_LANGS_QUEUE);

export const UPDATE_PROFILE_TAGS_QUEUE = 'update-profile-tags-queue';
const updateProfileTagsQueue = createQueue(UPDATE_PROFILE_TAGS_QUEUE);

const queues = {
  sendMessageQueue,
  insertProfileLastMessageQueue,
  insertCandidateIntoVacancyQueue,
  insertVacancyTagsQueue,
  updateVacancyLangsQueue,
  updateProfileTagsQueue
};

export { router, queues };
