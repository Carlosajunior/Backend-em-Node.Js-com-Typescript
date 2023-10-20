import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsNotEmpty } from "class-validator";

export class GetContactsQueryDTO {
  @ApiProperty({
    name: 'is_admin',
    required: true,
    description: 'Filtra os contatos que são cadastrados como responsáveis (administradores) de uma empresa cliente.',
    type: Boolean
  })
  @IsNotEmpty()
  @IsBooleanString()
  is_admin: boolean;
}
