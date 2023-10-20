import { DefaultModel } from '@/modules/common/shared/models';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';

export type MessageModel = DefaultModel & {
  title: string;
  types: string[];
  sender_name: string;
  sender_email: string;
  sms_content: string;
  email_content: string;
  vacancy_id: number;
  vacancies: Vacancy;
};
