import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SendMailLinkDossierDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  observation_id: string;
}
