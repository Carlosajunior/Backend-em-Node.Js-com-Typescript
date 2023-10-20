import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @MaxLength(1000)
  notes: string;

  @IsNumber()
  @IsNotEmpty()
  vacancy_id?: number;

  customer: string;
  user_id: string;
}
