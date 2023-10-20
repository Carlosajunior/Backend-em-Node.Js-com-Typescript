import { datatype } from 'faker';

import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { TagModel } from '@/modules/common/tags/models';
import { TagCategories } from '../../constants/tag-categories.constants';
import { TagsToProfile } from '../../entities';

export const mockTagModel = (): TagModel => ({
  ...mockDefaultModel(),
  name: datatype.string(),
  category: TagCategories.desenvolvimento,
  to_approve: false,
  tags_profile: [new TagsToProfile()],
  approver_id: datatype.string(),
  approver: null
});
