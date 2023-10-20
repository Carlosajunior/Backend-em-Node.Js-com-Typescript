import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator'
import { LanguageLevel } from '../constants'

export class CreateLanguageDTO {
  @MaxLength(15)
  @IsNotEmpty()
  @ApiProperty({
    title: "language",
    required: true,
    type: String
  })
  language: string

  @IsEnum(LanguageLevel, { message: 'level deve ser um valor válido (Iniciante, Intermediário, Avançado, Fluente)' })
  @IsNotEmpty()
  @ApiProperty({
    title: "level",
    required: true,
    enum: LanguageLevel
  })
  level: LanguageLevel
}
