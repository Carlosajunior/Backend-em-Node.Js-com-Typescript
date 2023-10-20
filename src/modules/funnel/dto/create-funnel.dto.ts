import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateColumnDTO } from '../columns/dtos';
import { Columns } from '../columns/entities';
import { FunnelConstants } from '../constants';

export class CreateFunnelDto {
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  name: string;

  @IsEnum(FunnelConstants)
  @IsOptional()
  @ApiPropertyOptional({
    title: "status",
    required: false,
    enum: FunnelConstants
  })
  status: FunnelConstants;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CreateColumnDTO)
  @ApiPropertyOptional({
    title: "columns",
    required: false,
    isArray: true,
    type: Array<Columns>
  })
  columns?: Columns[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "created_by",
    required: false,
    type: String
  })
  created_by?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "username_id",
    required: false,
    type: String
  })
  username_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "creator_id",
    required: false,
    type: String
  })
  creator_id?: string;
}
