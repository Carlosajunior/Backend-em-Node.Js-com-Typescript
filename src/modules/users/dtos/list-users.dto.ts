import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListUsersDTO {
  @IsNumber()
  @Transform((property) => Number(property.value))
  @IsOptional()
  @ApiPropertyOptional({
    title: "page",
    required: false,
    type: Number,
    default: 1
  })
  page?: number;

  @IsNumber()
  @Transform((property) => Number(property.value))
  @IsOptional()
  @ApiPropertyOptional({
    title: "records_per_page",
    required: false,
    type: Number,
    default: 15
  })
  records_per_page?: number;

  @IsOptional()
  @Transform((property) => property.value as boolean)
  @ApiPropertyOptional({
    title: "is_active",
    required: false,
    type: Boolean,
    default: true
  })
  is_active?: boolean;
}
