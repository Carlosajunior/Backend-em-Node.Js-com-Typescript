import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class GetAuditDTO {
  @ApiPropertyOptional({
    title: 'page',
    type: Number,
    required: false
  })
  @IsNumberString()
  @IsOptional()
  page?: number

  @ApiPropertyOptional({
    title: 'records_per_page',
    type: Number,
    required: false
  })
  @IsNumberString()
  @IsOptional()
  records_per_page?: number

  @ApiPropertyOptional({
    title: 'module',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  module: string

  @ApiPropertyOptional({
    title: 'date_option',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  date_option: string

  @ApiPropertyOptional({
    title: 'date_start',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  date_start: string

  @ApiPropertyOptional({
    title: 'date_end',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  date_end: string

  @ApiPropertyOptional({
    title: 'date',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  date: string

  @ApiPropertyOptional({
    title: 'user',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  user: string
}
