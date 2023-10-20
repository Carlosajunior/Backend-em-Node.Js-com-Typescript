import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator'

export class CreateSocialMediaDTO {
  id?: string

  @MaxLength(10)
  @IsNotEmpty()
  type: string

  @MaxLength(300)
  @IsUrl()
  @IsNotEmpty()
  link: string

  profile_id: string
}
