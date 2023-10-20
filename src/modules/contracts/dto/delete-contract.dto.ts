import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteContractDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: "customer_id",
    required: true,
    type: String
  })
  customer_id: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  name: string;
}
