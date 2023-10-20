import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateObservationRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @ApiProperty({
    title: "note",
    required: true,
    type: String,
    maxLength: 300
  })
  note: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    title: "profile_id",
    required: true,
    type: String
  })
  profile_id: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    title: "vacancy_id",
    required: true,
    type: Number
  })
  vacancy_id?: number;
}
