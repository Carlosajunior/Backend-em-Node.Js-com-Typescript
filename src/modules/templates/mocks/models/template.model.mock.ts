import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { TemplateStatus } from '@/modules/templates/constants/template-status.constant';
import { User } from '@/modules/users/entities/user.entity';
import { datatype } from 'faker';
import { TemplateModel } from '../../models/template.model';

export const mockTemplateModel = (): TemplateModel => ({
  ...mockDefaultModel(),
  title: datatype.string(),
  type: datatype.string(),
  description: datatype.string(),
  created_by: datatype.string(),
  username_id: datatype.string(),
  active: datatype.boolean(),
  email_title: datatype.string(),
  vacancy_url_text: datatype.string(),
  whatsapp_text_of_recruiter: datatype.string(),
  creator: new User(),
  creator_id: datatype.string(),
  status: TemplateStatus.ACTIVE,
});
