import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { ContactModel } from '@/modules/customers/contact/model/contact.model';
import { datatype } from 'faker';
import { Customer } from '../../../entities/customer.entity';

export const mockContactModel = (): ContactModel => ({
  ...mockDefaultModel(),
  name: datatype.string(),
  email: datatype.string(),
  phone: datatype.string(),
  cellphone: datatype.string(),
  role: datatype.string(),
  department: datatype.string(),
  customer: new Customer(),
  customerId: datatype.string(),
  active: datatype.boolean(),
  is_admin: datatype.boolean()
});
