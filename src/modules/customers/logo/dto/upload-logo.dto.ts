import { IsNotEmpty, MaxLength } from 'class-validator';
import { Customer } from '@/modules/customers/entities/customer.entity';

export class UploadLogoDto {
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @MaxLength(10)
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  customer: Customer;
}
