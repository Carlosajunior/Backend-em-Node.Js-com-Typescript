import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class GetProfileByEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    title: "email",
    required: true,
    type: String
  })
  email: string
}
