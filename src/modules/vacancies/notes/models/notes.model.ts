import { DefaultModel } from '@/modules/common/shared/models';
import { User } from '@/modules/users/entities/user.entity';
import { Vacancy } from '../../entities/vacancy.entity';

export type NotesModel = DefaultModel & {
  notes: string;
  customer: string;
  user: User;
  user_id: string
  vacancy_id: number;
  vacancy: Vacancy;
};
