import { CreateCustomerDto } from '@/modules/customers/dto/create-customer.dto';
import { State } from '@/modules/customers/entities/customer.entity';
import { name, phone, internet, random } from 'faker';
import { mockLogoModel } from '../model/logo.model.mock';

export const mockCreateCustomerDto = (): CreateCustomerDto => ({
  name: name.firstName(),
  phone: phone.phoneNumber(),
  email: internet.email(),
  document: '00011122233345',
  state: random.arrayElement(Object.values(State)),
  city: 'Rio de Janeiro',
  notes: 'Anotações',
  logo: mockLogoModel(),
  clt_benefits: "beneficios CLT",
  pj_benefits: "beneficios PJ",
  expiration_date: [new Date('1997-04-20')],
  observations: ["Observações"],
});
