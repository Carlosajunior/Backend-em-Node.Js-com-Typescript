import { RecipientDTO } from '../dtos';
import { Message } from '../entities';

interface SenderDTO {
  name: string;
  email: string;
}

export interface SendMessage {
  message: Message;
  recipient: RecipientDTO;
  sender: SenderDTO;
}
