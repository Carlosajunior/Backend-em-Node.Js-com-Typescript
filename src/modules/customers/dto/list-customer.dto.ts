import { FindQuery } from '../interface/find-query.interface';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export default class FindQueryDTO implements FindQuery {
  @ApiPropertyOptional({
    title: "name",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    title: "records_per_page",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  records_per_page?: string;

  @ApiPropertyOptional({
    title: "page",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({
    title: "active",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  active?: string;
}
