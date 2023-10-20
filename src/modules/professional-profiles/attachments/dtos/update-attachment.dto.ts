import { IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateAttachmentDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  url: string

  @IsNotEmpty()
  @IsUUID()
  profile_id: string
}
