import { ApiPropertyOptional } from '@nestjs/swagger'
import { MaxLength, IsNumberString, IsOptional, IsString } from 'class-validator'

export class SearchLanguageDTO {
  @MaxLength(255)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "search",
    required: false,
    type: String
  })
  search?: string

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "records_limit",
    required: false,
    type: Number
  })
  records_limit?: number
}
