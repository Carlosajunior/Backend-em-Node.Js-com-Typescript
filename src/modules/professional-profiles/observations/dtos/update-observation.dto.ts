import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

import { Columns } from '@/modules/funnel/columns/entities';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';

export class UpdateObservationDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @MaxLength(300)
  note: string;

  @IsOptional()
  identify?: string;

  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  contact_date?: Date;

  @IsOptional()
  @IsString()
  vacancy_id?: string;

  vacancy?: Vacancy;

  @IsOptional()
  @IsString()
  column_id?: string;

  column?: Columns;
}