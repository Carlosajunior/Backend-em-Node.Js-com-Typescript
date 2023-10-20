import { VacancyService } from '@/modules/vacancies/constants/vacancy-service.constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class OfferDTO {
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "commercial_name",
    required: true,
    type: String
  })
  commercial_name: string;

  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "recruiter_name",
    required: true,
    type: String,
    maxLength: 50
  })
  recruiter_name: string;

  @IsNumberString({
    message: 'Remuneração aceita somente formato numérico ex.: 0.00'
  })
  @ApiProperty({
    title: "remuneration",
    required: true,
    type: Number
  })
  remuneration: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    title: "start_date",
    required: true,
    type: Date
  })
  start_date: Date;

  @IsEnum(VacancyService)
  @ApiProperty({
    title: "type_of_contract",
    required: true,
    enum: VacancyService
  })
  type_of_contract: VacancyService;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "customer_contact_id",
    required: false,
    type: String
  })
  customer_contact_id?: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: "professional_profile_id",
    required: true,
    type: String
  })
  professional_profile_id: string;

  @IsNotEmpty({ message: 'É necessário informar uma vaga.' })
  @IsNumber()
  @ApiProperty({
    title: "vacancy_id",
    required: true,
    type: Number
  })
  vacancy_id: number;
}
