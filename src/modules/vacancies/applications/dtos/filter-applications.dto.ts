import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterApplicationsDTO {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional({
    title: "id",
    required: true,
    type: Number
  })
  id: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    title: "records_limit",
    required: false,
    type: Number
  })
  @Transform((prop) => Number(prop.value))
  records_limit?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "order_by",
    required: false,
    type: String
  })
  order_by?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: "languages",
    required: false,
    isArray: true,
    type: Array<string>
  })
  languages?: string[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: "work_modes",
    required: false,
    isArray: true,
    type: Array<string>
  })
  work_modes?: string[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: "tags",
    required: false,
    isArray: true,
    type: Array<string>
  })
  tags?: string[];
}
