import { State } from '@/modules/customers/entities/customer.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Experience } from '../constants/experience.constant';
import { VacancyService } from '../constants/vacancy-service.constants';
import { WorkModel } from '../constants/work-model.constant';
import { LanguageDTO } from './language.dto';

export class UpdateVacancyDTO {
  @IsNotEmpty()
  @ApiProperty({
    title: "title",
    required: true,
    type: String,
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "conferred",
    required: false,
    type: Boolean
  })
  conferred?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "advantages",
    required: false,
    type: String,
    maxLength: 5000
  })
  @MaxLength(5000)
  advantages?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "desc",
    required: false,
    type: String,
    maxLength: 5000
  })
  @MaxLength(5000)
  desc?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "desirable",
    required: false,
    type: String,
    maxLength: 5000
  })
  @MaxLength(5000)
  desirable?: string;

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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "requiriments",
    required: false,
    type: String,
    maxLength: 5000
  })
  @MaxLength(5000)
  requirements?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    title: "create_at",
    required: true,
    type: Date
  })
  create_at: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    title: "expire_at",
    required: true,
    type: Date
  })
  expire_at: Date;

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

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    title: "category_id",
    required: false,
    type: String
  })
  category_id?: number;

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

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: "languages",
    required: false,
    isArray: true,
    type: Array<LanguageDTO>
  })
  languages?: LanguageDTO[];

  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    title: "tag_ids",
    required: true,
    isArray: true,
    type: Array<string>
  })
  tag_ids?: string[];

  @MaxLength(30)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "project_time",
    required: false,
    type: String,
    maxLength: 30
  })
  project_time?: string;

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
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "status",
    required: true,
    type: String,
    maxLength: 10
  })
  status?: string;

  @MaxLength(100)
  @IsOptional()
  @ApiPropertyOptional({
    title: "status_comments",
    required: false,
    type: String,
    maxLength: 100
  })
  status_comments?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    title: "qtd_apply",
    required: true,
    type: Number
  })
  qtd_apply?: number;

  @IsEnum(VacancyService)
  @IsOptional()
  @ApiPropertyOptional({
    title: "service",
    required: false,
    type: VacancyService,
    enum: VacancyService
  })
  service?: VacancyService;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "recruiter_id",
    required: false,
    type: String
  })
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
