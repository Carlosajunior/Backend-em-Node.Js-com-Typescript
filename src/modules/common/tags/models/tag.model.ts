import { DefaultModel } from '@/modules/common/shared/models';
import { User } from '@/modules/users/entities/user.entity';
import { TagCategories } from '../constants/tag-categories.constants';
import { TagsToProfile } from '../entities';

export type TagModel = DefaultModel & {
  approver: User;
  approver_id: string;
  category: TagCategories;
  name: string;
  tags_profile: TagsToProfile[];
  to_approve: boolean;
};
