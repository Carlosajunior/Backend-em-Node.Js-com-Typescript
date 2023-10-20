import { IsObject } from 'class-validator';
import { MessageDTO } from './message.dto';
import { RecipientDTO } from './recipient.dto';
import { SenderDTO } from './sender.dto';

export class JobModelDTO {
  @IsObject()
  recipient: RecipientDTO;

  @IsObject()
  sender: SenderDTO;

  @IsObject()
  message: MessageDTO;
}
