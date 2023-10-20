import { DefaultModel } from '@/modules/common/shared/models';
import { User } from '@/modules/users/entities/user.entity';
import { FunnelConstants } from '../constants';

export type FunnelModel = DefaultModel & {
  name: string;
  status: FunnelConstants;
  created_by: string;
  username_id: string;
  creator_id: string;
  creator: User;
};
