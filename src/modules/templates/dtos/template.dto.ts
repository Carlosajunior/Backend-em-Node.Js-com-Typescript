import { MessageType } from '@/modules/messages/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TemplateStatus } from '../constants/template-status.constant';

export class TemplateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "title",
    required: true,
    type: String
  })
  title: string;

  @IsNotEmpty()
  @IsEnum(MessageType, {
    message:
      'tipo da mensagem deve possuir valores válidos (email, whatsapp, sms)'
  })
  @ApiProperty({
    title: "type",
    required: true,
    enum: MessageType,
    type: MessageType
  })
  type: MessageType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "description",
    required: true,
    type: String
  })
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional({
    title: "email_title",
    required: false,
    type: String,
    maxLength: 100
  })
  email_title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiPropertyOptional({
    title: "vacancy_url_text",
    required: false,
    type: String,
    maxLength: 200
  })
  vacancy_url_text: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiPropertyOptional({
    title: "whatsapp_text_of_recruiter",
    required: false,
    type: String,
    maxLength: 200
  })
  whatsapp_text_of_recruiter: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "created_by",
    required: false,
    type: String
  })
  created_by?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "username_id",
    required: false,
    type: String
  })
  username_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "creator_id",
    required: false,
    type: String
  })
  creator_id?: string;

  @IsOptional()
  @IsEnum(TemplateStatus)
  @ApiPropertyOptional({
    title: "status",
    required: false,
    enum: TemplateStatus
  })
  status?: TemplateStatus;
}
