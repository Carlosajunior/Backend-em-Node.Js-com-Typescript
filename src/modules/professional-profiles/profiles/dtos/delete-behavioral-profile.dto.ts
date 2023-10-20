import { ProfileBehavioralProfile } from '@/modules/professional-profiles/profiles/contansts'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class DeleteBehavioralProfileDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: "url",
    required: true,
    type: String
  })
  url: string

  @IsEnum(ProfileBehavioralProfile)
  @IsNotEmpty()
  @ApiProperty({
    title: "fieldname",
    required: true,
    enum: ProfileBehavioralProfile
  })
  fieldname: ProfileBehavioralProfile
}
