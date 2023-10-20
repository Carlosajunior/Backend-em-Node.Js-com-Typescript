import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class UpdateAnswerDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        title: 'id',
        type: String,
        required: true
    })
    id: string

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional({
        title: "profile_id",
        type: String,
        required: false
    })
    profile_id?: string

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional({
        title: "question_id",
        type: String,
        required: false
    })
    question_id?: string

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
    @ApiPropertyOptional({
        title: "answer",
        type: String,
        required: false
    })
    answer?: string
}