import { datatype } from 'faker';

import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { TagCategories } from '@/modules/common/tags/constants/tag-categories.constants';
import { mockTagsToProfileModel } from '@/modules/common/tags/mocks/models/tags-to-profile.mock';
import { TagModel } from '@/modules/common/tags/models';

export const mockTagModel = (): TagModel => ({
  ...mockDefaultModel(),
  name: datatype.string(),
  category: TagCategories.desenvolvimento,
  to_approve: false,
  tags_profile: [mockTagsToProfileModel()],
  approver_id: datatype.string(),
  approver: null
});
