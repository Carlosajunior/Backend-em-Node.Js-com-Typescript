import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateTagUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  profileId: string;
}
