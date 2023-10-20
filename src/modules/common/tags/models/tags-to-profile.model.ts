import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { DefaultModel } from '../../shared/models';
import { Tag } from '../entities';

export type TagsToProfileModel = DefaultModel & {
  tag_id: string;
  profile_id: string;
  experience_time: string;
  spotlight: boolean;
  tag: Tag;
  profile: Profile;
};
