import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateContractDTO {
  @IsNotEmpty()
  @IsDateString()
  expiration_date: Date[];

  @IsNotEmpty()
  @IsNumber()
  customer_id: string;

  @IsNotEmpty()
  @IsString()
  observations: string[];

  @IsOptional()
  @IsArray()
  alreadyUploaded?: boolean[];
}
