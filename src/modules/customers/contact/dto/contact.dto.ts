import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Customer } from '../../entities/customer.entity';

export class ContactDto {
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MaxLength(16)
  @IsOptional()
  @ApiProperty({
    required: false
  })
  phone?: string;

  @MaxLength(15)
  @IsOptional()
  @ApiProperty({
    required: false
  })
  cellphone?: string;

  @MaxLength(70)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  department: string;

  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false
  })
  is_admin?: boolean;

  customer?: Customer;
}
