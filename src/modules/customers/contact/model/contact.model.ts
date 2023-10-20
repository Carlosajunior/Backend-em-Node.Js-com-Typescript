import { DefaultModel } from '@/modules/common/shared/models';
import { Customer } from '../../entities/customer.entity';

export type ContactModel = DefaultModel & {
  name: string;
  email: string;
  phone?: string;
  cellphone?: string;
  role: string;
  department: string;
  customer: Customer;
  customerId: string;
  active: boolean
  is_admin?: boolean
};
