import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { MaxLength, IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsUUID } from 'class-validator'

export class CreateColumnDTO {
  @MaxLength(70)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  name: string

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    title: "index",
    required: false,
    type: Number
  })
  index?: number

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "postinterview",
    required: false,
    type: Boolean
  })
  postinterview?: boolean

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "preinterview",
    required: false,
    type: Boolean
  })
  preinterview?: boolean

  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    title: "funnel_id",
    required: false,
    type: String
  })
  funnel_id?: string
}
