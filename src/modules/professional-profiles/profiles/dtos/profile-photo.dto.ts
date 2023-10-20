import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class ProfilePhotoDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        title: "id",
        required: true,
        type: String
    })
    id: string
}