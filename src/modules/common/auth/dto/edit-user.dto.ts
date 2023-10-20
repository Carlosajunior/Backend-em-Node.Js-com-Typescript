import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditUserDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  middle_name: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  'custom:whatsapp': string;

  @ApiProperty()
  @IsOptional()
  'custom:position': string;

  @ApiProperty()
  @IsOptional()
  'custom:personal_email': string;

  @ApiProperty()
  @IsOptional()
  'custom:signature': string;
}
