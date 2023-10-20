import { SEND_MESSAGE_QUEUE_NAME } from '@/config/bull/bull';
import { redisConfig } from '@/config/redis';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Job, Worker } from 'bullmq';
import { getRepository } from 'typeorm';
import { JobModelDTO, MessageType } from '../dtos';
import { MessagesToProfile } from '../entities/message-to-profile.entity';
import { SendEmailService, SendSmsService } from '../services';

const workerProcessFunction = async (job: Job) => {
  const messageData: JobModelDTO = job.data;
  const { message, recipient } = messageData;
  const { types } = message;
  const sendEmailService = new SendEmailService();
  const sendSmsService = new SendSmsService();
  const profile = await getRepository(Profile).findOne({
    email: recipient.email
  });
  let mailings = 0;
  if (types.includes(MessageType.Email) && !!recipient?.email) {
    await sendEmailService.execute(messageData, () => mailings++);
  }

  if (types.includes(MessageType.SMS) && !!recipient?.phone) {
    await sendSmsService.execute(messageData, () => mailings++);
  }

  if (profile && mailings > 0) {
    const messages_profile = { message, profile };
    const created = getRepository(MessagesToProfile).create(messages_profile);
    await getRepository(MessagesToProfile).save(created);
    if (recipient.observation_id && recipient.edit_candidate) {
      const user = await getRepository(User).findOne({
        where: {
          email: messageData.sender.email
        }
      });

      await getRepository(Observation).update(recipient.observation_id, {
        linked_by: messageData.sender.name,
        recruiter_id: user.id
      });
    }
  }
};

new Worker(SEND_MESSAGE_QUEUE_NAME, workerProcessFunction, {
  connection: redisConfig.redis,
  concurrency: 2
});
