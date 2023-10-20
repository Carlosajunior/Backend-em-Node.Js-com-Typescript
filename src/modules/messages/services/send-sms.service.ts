import SNS from 'aws-sdk/clients/sns';
import config from '@/config/aws';
import { JobModelDTO } from '../dtos';

const { aws } = config;

export class SendSmsService {
  client = new SNS({
    region: 'us-east-1',
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey
  });

  async execute(job: JobModelDTO, cb?: () => void) {
    try {
      await this.client
        .publish({
          PhoneNumber: `+55${job.recipient.phone?.replace(/[^0-9]/g, '')}`,
          Message: job.message.sms_content
        })
        .promise();
        cb?.()
    } catch (error) {
      console.log(error);
    }
  }
}
