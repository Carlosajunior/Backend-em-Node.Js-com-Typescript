import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class DeleteAttachmentDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "url",
    required: true,
    type: String
  })
  url: string

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    title: "profile_id",
    required: true,
    type: String
  })
  profile_id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  name: string
}
