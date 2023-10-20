import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class InsertObservationsDTO {
    @IsOptional()
    @ApiPropertyOptional({
        title: 'vacancy_id',
        required: false
    })
    vacancy_id?: string;
  }
