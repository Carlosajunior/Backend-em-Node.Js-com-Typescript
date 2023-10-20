import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteAdheringProfessionalByProfileIdDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    title: "profile_id",
    required: true,
    type: String
  })
  profile_id: string;
}
