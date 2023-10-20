import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { LanguageLevel } from '../constants/language-level.constant';

export class LanguageDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({
    enum: LanguageLevel,
    type: LanguageLevel
  })
  @IsEnum(LanguageLevel)
  level: LanguageLevel;
}
