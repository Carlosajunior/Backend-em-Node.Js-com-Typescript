import { UploadLogoDto } from '@/modules/customers/logo/dto/upload-logo.dto';
import { datatype, name } from 'faker';
import { mockCustomerModel } from '../model/customer.model.mock';

export const mockUploadLogoDto = (): UploadLogoDto => ({
  name: name.findName(),
  url: datatype.string(),
  customer: mockCustomerModel(),
});
