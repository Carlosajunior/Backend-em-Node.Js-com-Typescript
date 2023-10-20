import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { RecipientDTO } from './recipient.dto';

export class RecipientReqDTO extends RecipientDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: "id",
    required: true,
    type: String
  })
  id: string;
}

export class SendMessageDTO {
  @IsArray()
  @ApiProperty({
    title: "recipients",
    isArray: true,
    type: Array<RecipientReqDTO>
  })
  recipients: RecipientReqDTO[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    title: "vacancy_id",
    required: false,
    type: Number
  })
  vacancy_id?: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    title: "templates_ids",
    required: true,
    maxItems: 2,
    type: Array<String>
  })
  templates_ids: string[];
}
