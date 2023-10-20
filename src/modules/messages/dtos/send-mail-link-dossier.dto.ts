import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class SendMailLinkDossierDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  profile_id: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  vacancy_id: string;
}
