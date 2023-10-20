import { RequestContext } from '@/modules/common/auth/middlewares';
import { MessageType, QueueDTO } from '@/modules/messages/dtos/queue.dto';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { Injectable } from '@nestjs/common';
import { MessagesToProfile } from '../entities/message-to-profile.entity';
import { MessagesRepository } from '../repositories';
import { MessagesToProfilesRepository } from '../repositories/message-to-profile.repository';
@Injectable()
export class SendMessageProducer {
  constructor(
    // @InjectQueue('send-message-queue') private queue: Queue,
    private readonly messagesRepository: MessagesRepository,
    private readonly profilesRepository: ProfilesRepository,
    private messagesToProfilesRepository: MessagesToProfilesRepository,
  ) {}
  async sendMessage(queue: QueueDTO) {
    const { message, recipients } = queue;
    const { name, middle_name, email } = RequestContext.currentUser();
    const sender_name = `${name} ${middle_name}`
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const sender = {
      email: email,
      name: sender_name
    };

    for (const template of message.templates) {
      if(template.type === 'email') {
        message.email_content = template.description
      }

      if(template.type === 'sms') {
        message.sms_content = template.description
      }
    }
    
    const created_message = await this.messagesRepository.createMessage({
      ...message,
      sender_email: email,
      sender_name
    });

    const bulk = []

    for (const recipient of recipients) {
      try {
        const profile = await this.profilesRepository.findProfileByEmail(
          recipient.email
        );
        const messages_profile = {
          message: created_message,
          profile
        };

        if (profile) {
          if (
            (message.types.includes(MessageType.Email) && !!recipient?.email) ||
            (message.types.includes(MessageType.SMS) && !!recipient?.phone) ||
            (message.types.includes(MessageType.WhatsApp) && !!recipient?.phone)
          ) {
            await this.messagesToProfilesRepository.createMessagesToProfile(
              messages_profile as MessagesToProfile
            );
          }
        }

        bulk.push({
          name: 'send-message-job',
          data: {
            recipient,
            sender,
            message
          },
          opts: {
            jobId: profile.id
          },
          removeOnFail: true
        })
      } catch (error) {
        console.log(error)
      }
    }
    // await this.queue.addBulk(bulk);
    await this.messagesRepository.save(created_message);
  }
}
