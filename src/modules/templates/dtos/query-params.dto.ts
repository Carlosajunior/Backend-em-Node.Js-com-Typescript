import { SearchDTO } from '@/modules/messages/dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryParams extends SearchDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'type',
    type: String
  })
  type: string;

  @IsOptional()
  @ApiPropertyOptional({
    title: 'active',
    type: Boolean
  })
  active: boolean;
}
