import { TokenPayload } from '@/modules/common/auth/models/token-payload.model';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateLoggedUserDTO {
  @ApiPropertyOptional({
    title: "access_profile",
    required: false,
    type: AccessProfiles,
    enum: AccessProfiles
  })
  @IsOptional()
  @IsEnum(AccessProfiles)
  access_profile?: AccessProfiles;

  @ApiPropertyOptional({
    title: "email",
    required: false,
    type: String
  })
  @IsOptional()
  @IsEmail()
  email?: string;

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

  @ApiPropertyOptional({
    title: "position",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    title: "squad_id",
    required: false,
    type: String
  })
  @IsOptional()
  @IsUUID()
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

  @ApiPropertyOptional({
    title: "token_payload",
    required: false
  })
  token_payload?: TokenPayload;
}
