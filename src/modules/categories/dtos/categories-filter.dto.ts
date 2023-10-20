import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class CategoriesFilterDTO {
  @IsOptional()
  @ApiPropertyOptional({
    title: "filters",
    required: false
  })
  filters?: { [key: string]: string | boolean }
}
