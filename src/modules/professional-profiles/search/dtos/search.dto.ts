import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class SearchProfileDTO {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    title: "page",
    required: false,
    default: '1',
    type: String
  })
  page?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    title: "records_per_page",
    required: false,
    default: '15',
    type: String
  })
  records_per_page?: number;

  @MaxLength(70)
  @IsOptional()
  @ApiProperty({
    title: "search",
    required: false,
    type: String,
    maxLength: 70
  })
  search?: string;
}
