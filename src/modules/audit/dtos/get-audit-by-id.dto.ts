import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator"

export class GetAuditByIdDTO {

    @ApiPropertyOptional({
        type: Number
    })
    @IsNumberString()
    @IsOptional()
    page?: number

    @ApiPropertyOptional({
        type: Number,
        default: 5
    })
    @IsNumberString()
    @IsOptional()
    records_per_page?: number

    @ApiProperty({
        required: true,
        type: String
    })
    @IsNotEmpty()
    @IsString()
    entity_id: string
}