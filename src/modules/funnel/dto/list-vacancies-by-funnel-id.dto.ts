import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchFunnelVacanciesDTO {
  @IsOptional()
  @ApiPropertyOptional({
    title: "page",
    required: false,
    default: '1',
    type: String
  })
  @Transform((prop) => (prop?.value ? Number(prop.value) : 1))
  page?: number;

  @IsOptional()
  @ApiPropertyOptional({
    title: "records_per_page",
    required: false,
    default: '5',
    type: String
  })
  @Transform((prop) => (prop?.value ? Number(prop.value) : 15))
  records_per_page?: number;
}
