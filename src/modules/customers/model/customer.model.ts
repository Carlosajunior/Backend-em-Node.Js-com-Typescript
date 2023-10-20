import { DefaultModel } from '@/modules/common/shared/models';
import { User } from '@/modules/users/entities/user.entity';
import { State } from '../entities/customer.entity';
import Logo from '../logo/entities/logo.entity';

export type CustomerModel = DefaultModel & {
  customerId?: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  state: State;
  city: string;
  notes: string;
  logo: Logo;
  active: boolean;
  created_by: string;
  username_id: string;
  clt_benefits: string;
  pj_benefits: string;
  creator_id: string;
  creator: User;
};
