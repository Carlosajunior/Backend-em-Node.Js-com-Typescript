import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty({
    title: "email",
    required: true,
    type: String,
    maxLength: 30
  })
  @IsNotEmpty()
  @IsEmail({}, { message: "Incorrect email or password." })
  email: string;

  @ApiProperty({
    title: "password",
    required: true,
    type: String
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
