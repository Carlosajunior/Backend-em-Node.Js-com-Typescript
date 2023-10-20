import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { CreateOfficeDto } from '../../offices/dto';
import { Office } from '../../offices/entities';

export class CreateExperienceDTO {
  id?: string;

  @MaxLength(100)
  @IsNotEmpty()
  company: string;

  @MaxLength(100)
  @IsNotEmpty()
  position: string;

  @IsOptional()
  initial_date: string;

  @IsOptional()
  end_date: string;

  @IsOptional()
  current_position: string;

  profile_id: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @Type(() => CreateOfficeDto)
  offices?: Office[];
}
