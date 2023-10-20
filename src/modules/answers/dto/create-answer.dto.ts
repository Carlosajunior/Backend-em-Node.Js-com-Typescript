import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateAnswerDTO {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        title: "profile_id",
        type: String,
        required: true
    })
    profile_id: string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        title: "question_id",
        type: String,
        required: true
    })
    question_id: string

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional({
        title: "alternative_id",
        type: String,
        required: false
    })
    alternative_id?: string

    @IsString()
    @IsOptional()
    @MinLength(10)
    @ApiPropertyOptional({
        title: "answer",
        type: String,
        required: false,
        minLength: 10
    })
    answer?: string
}