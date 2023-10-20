import { JobModelDTO, MessageType } from '@/modules/messages/dtos';
import { SendEmailService, SendSmsService } from '@/modules/messages/services';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send-message-queue')
export class SendMessagesConsumer {
  constructor(
    private sendEmailService: SendEmailService,
    private sendSmsService: SendSmsService,
    ) {}
  @Process()
  async sendMessageJob(job: Job<JobModelDTO>) {
    const { data } = job;
      if (data.message.types.includes(MessageType.Email) && !!data?.recipient?.email) {
        await this.sendEmailService.execute(data);
      }
  
      if (data.message.types.includes(MessageType.SMS) && !!data?.recipient?.phone) {
        await this.sendSmsService.execute(data)
      }
  
      if (data.message.types.includes(MessageType.WhatsApp) && !!data?.recipient?.phone) {
        // chamar o serviço de envio via whatsapp
      }

      return {}
  }

  @OnQueueActive()
    async OnActive(job){
      console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`,)
    }

  @OnQueueError()
  async onError(error){
    console.log(error)
  }

  @OnQueueFailed()
  async onFailed(job, error) {
    console.log(error)
    console.log(job)
  }

  @OnQueueCompleted()
    async OnQueueCompleted(job) {
      console.log(`Completed job ${job.id} of type ${job.name} with data ${job.data}...`,)
    }
  
}
