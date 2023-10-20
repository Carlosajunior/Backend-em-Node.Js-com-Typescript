import { AuditEvent, AuditModule } from '@/modules/audit/constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuditDTO {
  @ApiProperty({
    title: 'event_type',
    required: true,
    enum: AuditEvent
  })
  @IsEnum(AuditEvent)
  @IsNotEmpty()
  event_type: AuditEvent;

  @ApiProperty({
    title: 'event_description',
    required: true,
    isArray: true,
    type: Array<string>
  })
  @IsNotEmpty()
  @IsArray()
  event_description: string[];

  @ApiPropertyOptional({
    title: 'user_id',
    required: false,
    type: String
  })
  @IsString()
  @IsOptional()
  user_id: string;

  @ApiPropertyOptional({
    title: 'username',
    required: false,
    type: String
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiPropertyOptional({
    title: 'user_email',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  user_email: string;

  @ApiPropertyOptional({
    title: 'table_name',
    required: false,
    type: String
  })
  @IsString()
  @IsOptional()
  table_name?: string;

  @ApiPropertyOptional({
    title: 'entity_id',
    required: false,
    type: String
  })
  @IsString()
  @IsOptional()
  entity_id: string;

  @ApiPropertyOptional({
    title: 'ip',
    required: false,
    type: String
  })
  @IsString()
  @IsOptional()
  ip: string;

  @ApiPropertyOptional({
    title: 'module',
    required: false,
    enum: AuditModule
  })
  @IsEnum(AuditModule)
  @IsOptional()
  module: AuditModule;

  @ApiPropertyOptional({
    title: 'old_value',
    required: false
  })
  @IsOptional()
  old_value?: Record<string, unknown>;

  @ApiPropertyOptional({
    title: 'new_value',
    required: false
  })
  @IsOptional()
  new_value?: Record<string, unknown>;

  @ApiPropertyOptional({
    title: 'creator_id',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  creator_id?: string;
}
