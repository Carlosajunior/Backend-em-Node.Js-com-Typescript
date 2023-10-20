import { TemplateDTO } from '@/modules/templates/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MessageType } from './queue.dto';

export class MessageDTO {
  @IsArray()
  @IsNotEmpty()
  @IsEnum(MessageType, {
    each: true,
    message:
      'tipo da mensagem deve possuir valores válidos (email, whatsapp, sms)'
  })
  @ApiProperty({
    isArray: true,
    type: Array<MessageType>
  })
  types: MessageType[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'Título do e-mail'
  })
  title: string;

  sender_name?: string;
  sender_email?: string;

  email_content: string;
  sms_content: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Título do SMS'
  })
  sms_title?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  vacancy_id?: number

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: Array<TemplateDTO>
  })
  templates: TemplateDTO[];
}
