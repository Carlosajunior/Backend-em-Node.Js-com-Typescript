import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { LogoModel } from '@/modules/customers/logo/model/logo.model';
import { datatype } from 'faker';

export const mockLogoModel = (): LogoModel => ({
  ...mockDefaultModel(),
  name: datatype.string(),
  url: datatype.string()
});
