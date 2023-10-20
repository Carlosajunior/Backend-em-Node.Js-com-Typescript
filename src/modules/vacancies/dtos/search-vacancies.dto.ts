import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { State } from '@/modules/customers/entities/customer.entity';
import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';
import { DateOption } from '../constants/date-option.constant';
import { Experience } from '../constants/experience.constant';
import { WorkModel } from '../constants/work-model.constant';
import { LanguageDTO } from './language.dto';

export class SearchVacanciesDTO extends SearchProfileDTO {
  @IsNotEmpty()
  @IsEnum(TypeSearch)
  @ApiProperty({
    title: "type_search",
    required: true,
    enum: TypeSearch,
    default: TypeSearch.SEARCH
  })
  type_search: TypeSearch;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform((title) => title?.value?.trim())
  @ApiPropertyOptional({
    title: "title",
    required: false,
    type: String,
    maxLength: 100
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(7)
  @Transform((identify) => identify?.value?.trim())
  @ApiPropertyOptional({
    title: "identify",
    required: false,
    type: String,
    maxLength: 7
  })
  identify?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform((customer_name) => customer_name?.value?.trim())
  @ApiPropertyOptional({
    title: "customer_name",
    required: false,
    type: String,
    maxLength: 100
  })
  customer_name?: string;

  @IsOptional()
  @IsEnum(Experience, { each: true })
  @ApiPropertyOptional({
    title: "experience_levels",
    required: false,
    isArray: true,
    enum: Experience,
    type: Array<Experience>
  })
  experience_levels?: Experience[];

  @IsOptional()
  @ApiPropertyOptional({
    title: "languages",
    required: false,
    isArray: true,
    type: Array<LanguageDTO>
  })
  languages?: LanguageDTO[];

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    title: "contract_models",
    required: false,
    isArray: true,
    type: Array<String>
  })
  contract_models?: string[];

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    title: "tags",
    required: false,
    isArray: true,
    type: Array<String>
  })
  tags?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    title: "work_modes",
    required: false,
    isArray: true,
    enum: WorkModel,
    type: Array<WorkModel>
  })
  @IsEnum(WorkModel, { each: true })
  work_modes?: WorkModel[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "city",
    required: false,
    type: String
  })
  city?: string;

  @IsOptional()
  @ApiPropertyOptional({
    title: "state",
    required: false,
    enum: State,
    type: State
  })
  @IsEnum(State)
  state?: State;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "partner_company",
    required: false,
    type: String
  })
  partner_company?: string;

  @IsOptional()
  @IsEnum(DateOption)
  @ApiPropertyOptional({
    title: "date_option",
    required: false,
    enum: DateOption,
    type: DateOption
  })
  date_option?: DateOption;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "date",
    required: false,
    type: String
  })
  date?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "date_start",
    required: false,
    type: String
  })
  date_start?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "date_end",
    required: false,
    type: String
  })
  date_end?: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    title: "status",
    required: false,
    isArray: true,
    type: Array<String>
  })
  status?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "project_time",
    required: false,
    type: String
  })
  project_time?: string;
}
