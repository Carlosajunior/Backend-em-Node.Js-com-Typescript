import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, MaxLength } from 'class-validator';
import { FunnelConstants } from '../constants';

export default class FindFunnelDto {
  @MaxLength(70)
  @IsOptional()
  @ApiPropertyOptional({
    title: "search",
    required: false,
    type: String
  })
  search?: string;

  @IsOptional()
  @IsEnum(FunnelConstants)
  @ApiPropertyOptional({
    title: "status",
    required: false,
    enum: FunnelConstants
  })
  status?: FunnelConstants;

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
}
