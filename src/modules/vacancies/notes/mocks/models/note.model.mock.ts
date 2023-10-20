import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { User } from '@/modules/users/entities/user.entity';
import { datatype } from 'faker';
import { NotesModel } from '../../models/notes.model';

export const mockNoteModel = (): NotesModel => ({
  ...mockDefaultModel(),
  notes: datatype.string(),
  customer: datatype.string(),
  user: new User(),
  user_id: datatype.string(),
  vacancy_id: datatype.number(),
  vacancy: null
});
