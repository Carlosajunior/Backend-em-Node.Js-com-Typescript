import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReplicateVacancyDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Transform((id) => Number(id.value))
  @ApiProperty({
    title: "id",
    required: true,
    type: Number
  })
  id: number;
}
