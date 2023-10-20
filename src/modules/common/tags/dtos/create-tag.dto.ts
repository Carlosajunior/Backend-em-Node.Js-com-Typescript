import { ApiProperty } from '@nestjs/swagger'
import { MaxLength, IsNotEmpty, IsEnum, IsBoolean, IsOptional } from 'class-validator'
import { TagCategories } from '../constants/tag-categories.constants'

export class CreateTagDTO {
  @MaxLength(70)
  @IsNotEmpty()
  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  name: string

  @IsNotEmpty()
  @IsEnum(TagCategories)
  @ApiProperty({
    title: "name",
    required: true,
    enum: TagCategories
  })
  category: TagCategories

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    title: "to_approve",
    required: true,
    type: Boolean
  })
  to_approve?: boolean
}
