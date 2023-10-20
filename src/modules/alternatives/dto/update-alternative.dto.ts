import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateAlternativeDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        title: 'id',
        type: String,
        required: true
    })
    id: string

    @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
        title: 'question_id',
        type: String,
        required: false
    })
    question_id?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        title: 'description',
        type: String,
        required: false
    })
    description?: string
}