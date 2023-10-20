import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { State } from '@/modules/customers/entities/customer.entity';
import { CustomerModel } from '@/modules/customers/model/customer.model';
import { datatype, random } from 'faker';
import { mockLogoModel } from './logo.model.mock';

export const mockCustomerModel = (): CustomerModel => ({
  ...mockDefaultModel(),
  name: datatype.string(),
  customerId: datatype.string(),
  document: datatype.string(),
  email: datatype.string(),
  phone: datatype.string(),
  state: random.arrayElement(Object.values(State)),
  city: datatype.string(),
  notes: datatype.string(),
  logo: mockLogoModel(),
  active: datatype.boolean(),
  created_by: datatype.string(),
  username_id: datatype.string(),
  pj_benefits: datatype.string(),
  clt_benefits: datatype.string(),
  creator: null,
  creator_id: datatype.string(),
});
