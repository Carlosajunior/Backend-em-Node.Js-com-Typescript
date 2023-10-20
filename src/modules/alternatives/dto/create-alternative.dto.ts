import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAlternativeDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        title: 'question_id',
        type: String,
        required: true
    })
    question_id: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        title: 'description',
        type: String,
        required: true
    })
    description: string
}