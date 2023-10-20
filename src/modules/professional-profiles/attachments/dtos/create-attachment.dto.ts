import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateAttachmentDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  url: string

  @IsNotEmpty()
  @IsUUID()
  profile_id: string
}
