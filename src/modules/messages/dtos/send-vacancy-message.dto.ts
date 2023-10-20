import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { RecipientDTO } from './recipient.dto';

export class SendVacancyMessageDTO {
  @IsArray()
  @ApiProperty({
    title: "recipients",
    required: true,
    isArray: true,
    type: Array<RecipientDTO>
  })
  recipients: RecipientDTO[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    title: "vacancy_id",
    required: true,
    type: Number
  })
  vacancy_id: number;

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
