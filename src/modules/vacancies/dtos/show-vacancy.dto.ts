import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ShowVacancyDTO {
  @ApiProperty({
    title: "id",
    required: true,
    type: Number
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => Number(id.value))
  id: number;
}
