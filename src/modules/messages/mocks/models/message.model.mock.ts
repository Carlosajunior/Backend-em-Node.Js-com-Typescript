import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { datatype } from 'faker';
import { MessageModel } from '../../models/message.model';

export const mockMessageModel = (): MessageModel => ({
  ...mockDefaultModel(),
  title: datatype.string(),
  types: [datatype.string()],
  sender_name: datatype.string(),
  sender_email: datatype.string(),
  sms_content: datatype.string(),
  email_content: datatype.string(),
  vacancy_id: datatype.number(),
  vacancies: null
});
