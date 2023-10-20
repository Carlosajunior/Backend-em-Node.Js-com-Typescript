import { WorkModel } from '@/modules/vacancies/constants/work-model.constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { ExecutionTime } from '../constants/execution-time.constant';
import { TypeOfContract } from '../constants/type-of-contract.constant';

export class CreateOfferLetterDTO {
  @IsNotEmpty()
  @IsString()
  @Transform((prop) => String(prop.value.trim()))
  @ApiProperty({
    title: "area",
    required: true,
    type: String
  })
  area: string;

  @IsEnum(ExecutionTime)
  @IsOptional()
  @ApiPropertyOptional({
    title: "execution_time",
    required: false,
    type: ExecutionTime,
    enum: ExecutionTime
  })
  execution_time?: ExecutionTime;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    title: "has_provisional_equipment_to_start",
    required: false,
    type: Boolean
  })
  has_provisional_equipment_to_start: boolean;

  @IsNotEmpty()
  @IsString()
  @Transform((prop) => String(prop.value.trim()))
  @ApiProperty({
    title: "manager",
    required: true,
    type: String
  })
  manager: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "mentor",
    required: false,
    type: String
  })
  @Transform((prop) => prop?.value?.trim())
  mentor?: string;

  @IsNotEmpty()
  @IsString()
  @Transform((prop) => String(prop.value.trim()))
  @ApiProperty({
    title: "role",
    required: true,
    type: String
  })
  role: string;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "salary_clt",
    required: false,
    type: Number
  })
  salary_clt?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    title: "send_equipment",
    required: false,
    type: Boolean
  })
  send_equipment: boolean;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    title: "start_date",
    required: true,
    type: Date
  })
  start_date: Date;
  
  @IsOptional()
  @IsString()
  @Transform((prop) => String(prop.value.trim()))
  @ApiProperty({
    title: "t_shirt_size",
    required: false,
    type: String
  })
  t_shirt_size: string;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "time_purchase_pj",
    required: false,
    type: Number
  })
  time_purchase_pj?: number;

  @IsEnum(TypeOfContract)
  @IsNotEmpty()
  @ApiProperty({
    title: "type_of_contract",
    required: true,
    type: TypeOfContract,
    enum: TypeOfContract
  })
  type_of_contract: TypeOfContract;

  @IsEnum(WorkModel)
  @IsNotEmpty()
  @ApiProperty({
    title: "work_model",
    required: true,
    type: WorkModel,
    enum: WorkModel
  })
  work_model: WorkModel;

  @IsOptional()
  @IsString()
  @Transform((prop) => prop?.value?.trim())
  @ApiPropertyOptional({
    title: "work_schedule",
    required: false,
    type: String
  })
  work_schedule?: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    title: "offer_letter_template_id",
    required: true,
    type: String
  })
  offer_letter_template_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    title: "vacancy_id",
    required: true,
    type: Number
  })
  vacancy_id: number;
}
