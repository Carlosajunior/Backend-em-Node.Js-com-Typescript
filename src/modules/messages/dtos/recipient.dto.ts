import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RecipientDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean
  })
  edit_candidate?: boolean;

  @IsOptional()
  @ApiPropertyOptional()
  observation_id?: string;
}
