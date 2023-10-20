import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateQuestionDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        title: 'id',
        type: String,
        required: true
    })
    id: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        title: 'title',
        type: String,
        required: false
    })
    title?: string
}