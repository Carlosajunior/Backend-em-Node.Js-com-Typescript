import config from '@/config/aws';
import { JobModelDTO } from '@/modules/messages/dtos';
import { Injectable } from '@nestjs/common';
import SES from 'aws-sdk/clients/ses';
const { aws } = config;

@Injectable()
export class SendEmailService {
  client = new SES({
    region: 'us-east-1',
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey
  });

  async execute(job: JobModelDTO, cb?: () => void) {
    try {
      await this.client
        .sendEmail({
          Source: `${job.sender.name} <${job.sender.email}>`,
          Destination: {
            ToAddresses: [`${job.recipient.name} <${job.recipient.email}>`]
          },
          Message: {
            Subject: {
              Data: job.message.title
            },
            Body: {
              Html: {
                Data: job.message.email_content
              }
            }
          }
        })
        .promise();
      cb?.();
    } catch (error) {
      console.log(error);
    }
  }
}
