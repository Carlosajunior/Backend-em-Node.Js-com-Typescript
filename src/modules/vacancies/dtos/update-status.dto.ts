import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateVacancyStatusDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    title: "id",
    required: true,
    type: Number
  })
  id?: number;

  @MaxLength(10)
  @IsString()
  @ApiPropertyOptional({
    title: "status",
    required: false,
    type: String,
    maxLength: 10
  })
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional({
    title: "status_comments",
    required: false,
    type: String,
    maxLength: 100
  })
  status_comments?: string;
}
