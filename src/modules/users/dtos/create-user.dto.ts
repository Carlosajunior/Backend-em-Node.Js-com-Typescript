import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    title: "access_profile",
    required: true,
    type: AccessProfiles,
    enum: AccessProfiles
  })
  @IsNotEmpty()
  @IsEnum(AccessProfiles)
  access_profile: AccessProfiles;

  @ApiProperty({
    title: "email",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    title: "email_signature",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  email_signature?: string;

  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: "middle_name",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @ApiProperty({
    title: "position",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiPropertyOptional({
    title: "squad_id",
    required: false,
    type: String
  })
  @IsOptional()
  @IsUUID()
  @Transform((prop) => (prop?.value ? prop.value : null))
  squad_id?: string;

  @ApiProperty({
    title: "whatsapp_business",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @IsString()
  whatsapp_business: string;

  @ApiPropertyOptional({
    title: "is_active",
    required: false,
    type: Boolean
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
