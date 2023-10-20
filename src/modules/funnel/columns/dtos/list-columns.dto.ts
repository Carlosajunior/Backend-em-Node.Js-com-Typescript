import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { MaxLength, IsOptional, IsNumberString, IsUUID, IsNotEmpty } from 'class-validator'

export class ListColumnsDTO {
  @MaxLength(70)
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: "id",
    required: true,
    type: String
  })
  id: string

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "records_limit",
    required: false,
    type: Number
  })
  records_limit?: number
}
