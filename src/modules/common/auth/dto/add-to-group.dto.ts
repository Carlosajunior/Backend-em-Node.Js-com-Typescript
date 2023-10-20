import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddToGroupDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    group: string
}