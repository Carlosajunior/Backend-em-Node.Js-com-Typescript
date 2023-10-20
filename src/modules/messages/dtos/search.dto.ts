import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchDTO {

  @ApiProperty({
    title: "type_search",
    required: true,
    enum: TypeSearch,
    default: TypeSearch.SEARCH
  })
  @IsEnum(TypeSearch)
  type_search?: TypeSearch = TypeSearch.SEARCH;
  
  @MaxLength(70)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "search",
    required: false,
    type: String
  })
  search?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "user_email",
    required: false,
    type: String
  })
  user_email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "professional_id",
    required: false,
    type: String
  })
  professional_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "vacancy_id",
    required: false,
    type: String
  })
  vacancy_id?: string;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "page",
    required: false,
    type: Number
  })
  page?: number;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "records_per_page",
    required: false,
    type: Number
  })
  records_per_page?: number;

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
}
