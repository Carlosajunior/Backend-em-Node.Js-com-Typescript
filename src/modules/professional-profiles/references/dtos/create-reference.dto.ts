import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator'

export class CreateReferenceDTO {
  @MaxLength(30)
  @IsNotEmpty()
  description: string

  @MaxLength(300)
  @IsUrl()
  @IsNotEmpty()
  link: string

  profile_id: string
}
