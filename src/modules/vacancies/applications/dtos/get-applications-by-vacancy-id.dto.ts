import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class ApplyDTO {
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
    title: "vacancy_id",
    required: true,
  })
  vacancy_id?: number;
}
