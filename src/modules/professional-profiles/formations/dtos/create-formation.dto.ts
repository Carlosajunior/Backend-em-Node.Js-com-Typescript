import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreateFormationDTO {
  @MaxLength(100)
  @IsNotEmpty()
  institution: string

  @MaxLength(150)
  @IsNotEmpty()
  course: string

  @IsOptional()
  initial_date: string

  @IsOptional()
  end_date: string

  profile_id: string
}
