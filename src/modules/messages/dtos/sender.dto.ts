import { IsNotEmpty, IsString } from 'class-validator';

export class SenderDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
