import { MaxLength, IsNotEmpty } from 'class-validator'

export class DeleteColumnDTO {
  @MaxLength(255)
  @IsNotEmpty()
  id: string
}
