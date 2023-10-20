import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiPropertyOptional({
    title: "alreadyUploaded",
    required: false,
    isArray: true,
    type: Array<Boolean>
  })
  @IsOptional()
  @IsArray()
  alreadyUploaded?: boolean[];
}
