import { State } from '@/modules/customers/entities/customer.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Experience } from '../constants/experience.constant';
import { VacancyService } from '../constants/vacancy-service.constants';
import { WorkModel } from '../constants/work-model.constant';
import { LanguageDTO } from './language.dto';

export class CreateVacancyDTO {
  @ApiProperty({
    title: "title",
    required: true,
    type: String,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Transform((title) => title.value.trim())
  title: string;

  @ApiPropertyOptional({
    title: "desc",
    required: false,
    type: String,
    maxLength: 5000
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  desc?: string;

  @ApiPropertyOptional({
    title: "requiriments",
    required: false,
    type: String,
    maxLength: 5000
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  requirements?: string;

  @ApiPropertyOptional({
    title: "desirable",
    required: false,
    type: String,
    maxLength: 5000
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  desirable?: string;

  @ApiPropertyOptional({
    title: "advantages",
    required: false,
    type: String,
    maxLength: 5000
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  advantages?: string;

  @ApiPropertyOptional({
    title: "category_id",
    required: true,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @ApiProperty({
    title: "create_at",
    required: true,
    type: Date
  })
  @IsDateString()
  @IsNotEmpty()
  create_at: Date;

  @ApiProperty({
    title: "expire_at",
    required: true,
    type: Date
  })
  @IsDateString()
  @IsNotEmpty()
  expire_at: Date;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    title: "customer_id",
    required: false,
    type: String
  })
  customer_id?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    title: "contact_id",
    required: false,
    type: String
  })
  contact_id?: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    title: "funnel_id",
    required: false,
    type: String
  })
  funnel_id?: string;

  @MinLength(6)
  @MaxLength(10)
  @IsNotEmpty()
  @IsEnum(WorkModel)
  @ApiProperty({
    title: "work_model",
    required: true,
    enum: WorkModel,
    type: WorkModel,
    minLength: 6,
    maxLength: 10
  })
  work_model: WorkModel;

  @MaxLength(2)
  @IsOptional()
  @IsEnum(State)
  @ApiPropertyOptional({
    title: "state",
    required: false,
    enum: State,
    type: State,
    maxLength: 2
  })
  state?: State;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "city",
    required: false,
    type: String
  })
  city?: string;

  @MinLength(5)
  @MaxLength(12)
  @IsNotEmpty()
  @ApiProperty({
    title: "experience",
    required: true,
    enum: Experience,
    type: Experience,
    minLength: 5,
    maxLength: 12
  })
  @IsEnum(Experience)
  experience: Experience;

  @IsEnum(VacancyService)
  @IsOptional()
  @ApiPropertyOptional({
    title: "service",
    required: false,
    type: VacancyService,
    enum: VacancyService
  })
  service?: VacancyService;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: "languages",
    required: false,
    isArray: true,
    type: Array<LanguageDTO>
  })
  languages?: LanguageDTO[];

  @ApiPropertyOptional({
    title: "project_time",
    required: false,
    type: String,
    maxLength: 30
  })
  @MaxLength(30)
  @IsOptional()
  @IsString()
  project_time?: string;

  @MaxLength(8)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "contract_model",
    required: false,
    type: String,
    maxLength: 8
  })
  contract_model?: string;

  @IsNumberString({
    message: 'Valor hora venda aceita somente formato numérico ex.: 0.00'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "time_sale_value_pj",
    required: false,
    type: Number
  })
  time_sale_value_pj?: number;

  @IsNumberString({
    message: 'Valor hora compra aceita somente formato numérico ex.: 0.00'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "time_purchase_pj",
    required: false,
    type: Number
  })
  time_purchase_pj?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "complement_values_pj",
    required: false,
    type: String
  })
  complement_values_pj?: string;

  @IsNumberString({
    message: 'Valor hora venda aceita somente formato numérico ex.: 0.00'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "time_sale_value_clt",
    required: false,
    type: Number
  })
  time_sale_value_clt?: number;

  @IsNumberString({
    message: 'Valor hora compra aceita somente formato numérico ex.: 0.00'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "time_purchase_clt",
    required: false,
    type: Number
  })
  time_purchase_clt?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "complement_values_clt",
    required: false,
    type: String
  })
  complement_values_clt?: string;

  @MaxLength(10, { message: 'status deve ser menor ou igual a 10 caracteres.' })
  @IsString()
  @IsNotEmpty({ message: 'status não deve estar vazio.' })
  @ApiProperty({
    title: "status",
    required: true,
    type: String,
    maxLength: 10
  })
  status: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "status_comments",
    required: false,
    type: String,
    maxLength: 100
  })
  @MaxLength(100)
  status_comments?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    title: "qtd_apply",
    required: true,
    type: Number
  })
  qtd_apply: number;

  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    title: "tag_ids",
    required: false,
    type: Array<string>,
    isArray: true
  })
  tag_ids?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    title: "recruiter_id",
    required: false,
    type: String
  })
  @IsUUID()
  recruiter_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "partner_company",
    required: false,
    type: String
  })
  partner_company?: string;
}
