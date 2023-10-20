import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCognitoUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  'custom:whatsapp': string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  'custom:position': string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  'custom:personal_email'?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  'custom:signature'?: string;

  'custom:message_quota': string;
  email_verified: string;
}
