import { ApiPropertyOptional } from '@nestjs/swagger'
import { MaxLength, IsOptional, IsNumberString, IsEnum, IsBoolean, IsBooleanString } from 'class-validator'
import { TagCategories } from '../constants/tag-categories.constants'

export class ListTagsDTO {
  @MaxLength(70)
  @IsOptional()
  @ApiPropertyOptional({
    title: "search",
    required: false,
    type: String
  })
  search?: string

  @IsOptional()
  @IsEnum(TagCategories)
  @ApiPropertyOptional({
    title: "category",
    required: false,
    enum: TagCategories
  })
  category?: TagCategories

  @IsOptional()
  @IsBooleanString()
  @ApiPropertyOptional({
    title: "to_approve",
    required: false,
    type: Boolean
  })
  to_approve?: boolean

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "page",
    required: false,
    type: Number
  })
  page?: number

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "records_per_page",
    required: false,
    type: Number
  })
  records_per_page?: number
}
