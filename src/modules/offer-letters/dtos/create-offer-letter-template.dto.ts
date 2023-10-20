import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeOfContract } from '../constants/type-of-contract.constant';

export class CreateOfferLetterTemplateDTO {
  @ApiProperty({
    title: "text",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @Transform((prop) => prop.value.trim())
  text: string;

  @ApiProperty({
    title: "title",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @Transform((prop) => prop.value.trim())
  title: string;

  @ApiProperty({
    title: "type_of_contract",
    type: TypeOfContract,
    enum: TypeOfContract
  })
  @IsEnum(TypeOfContract)
  type_of_contract: TypeOfContract;
}
