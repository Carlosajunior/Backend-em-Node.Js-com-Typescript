import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ContactDto } from './contact.dto';

export class CreateContactDTO extends ContactDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: "customer_id",
    required: true,
    type: String
  })
  customer_id: string;
}
