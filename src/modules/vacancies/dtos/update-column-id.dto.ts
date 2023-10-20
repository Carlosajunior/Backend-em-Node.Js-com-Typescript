import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateColumnIdDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  observation_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  old_observation_id: string;
}
