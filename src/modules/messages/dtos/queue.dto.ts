import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { MessageDTO } from './message.dto';
import { RecipientDTO } from './recipient.dto';

export enum MessageType {
  Email = 'email',
  SMS = 'sms',
  WhatsApp = 'whatsapp'
}

export class QueueDTO {
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: Array<RecipientDTO>
  })
  recipients: RecipientDTO[];

  @IsObject()
  @ApiProperty({ type: () => MessageDTO })
  message: MessageDTO;
}
