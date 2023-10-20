import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

import { Columns } from '@/modules/funnel/columns/entities';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';

export class CreateObservationDTO {
  @IsNotEmpty()
  @MaxLength(300)
  note: string;

  @IsDateString()
  @IsOptional()
  contact_date?: Date;

  @IsOptional()
  identify?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  @IsString()
  column_id?: string;

  column?: Columns;

  @IsOptional()
  @IsString()
  profile_id?: string;

  @IsOptional()
  @IsString()
  vacancy_id?: string;

  vacancy?: Vacancy;
}
