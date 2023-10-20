import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateQuestionDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        title: 'title',
        type: String,
        required: true
    })
    title: string

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsObject({ each: true })
    @ApiPropertyOptional({
        title: 'alternatives',
        type: Array<{ description: string }>,
        required: false,
        isArray: true
    })
    alternatives: {
        description: string
    }[]
}