import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsUUID } from "class-validator";

export class GetQuestionAnswersDTO {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        title: "question_id",
        type: String,
        required: true
    })
    question_id: string

    @ApiPropertyOptional({
        title: 'page',
        type: Number,
        required: false
    })
    @IsNumberString()
    @IsOptional()
    page?: number

    @ApiPropertyOptional({
        title: 'records_per_page',
        type: Number,
        default: 15,
        required: false
    })
    @IsNumberString()
    @IsOptional()
    records_per_page?: number
}