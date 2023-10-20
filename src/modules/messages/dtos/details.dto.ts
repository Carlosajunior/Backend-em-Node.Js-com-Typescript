import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { MaxLength, IsNumberString, IsOptional, IsUUID, IsNotEmpty, IsString } from 'class-validator'

export class DetailsDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: "id",
    required: true,
    type: String
  })
  id: string

  @MaxLength(70)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "search",
    required: true,
    type: String
  })
  search?: string

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "page",
    required: true,
    type: Number
  })
  page?: number

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "records_per_page",
    required: true,
    type: Number
  })
  records_per_page?: number
}
