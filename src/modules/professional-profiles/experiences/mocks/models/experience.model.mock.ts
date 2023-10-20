import { datatype } from 'faker';

import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { ExperienceModel } from '@/modules/professional-profiles/experiences/models';
import { mockOfficeModel } from '@/modules/professional-profiles/offices/mocks/models';

export const mockExperienceModel = (): ExperienceModel => ({
  ...mockDefaultModel(),
  description: datatype.string(),
  company: datatype.string(),
  current_position: datatype.string(),
  end_date: datatype.string(),
  initial_date: datatype.string(),
  position: datatype.string(),
  profile_id: datatype.string(),
  offices: [mockOfficeModel()]
});
