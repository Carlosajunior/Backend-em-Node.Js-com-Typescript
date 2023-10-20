import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator"

export class GetRolesDTO {
    @ApiPropertyOptional({
        title: "page",
        required: false,
        type: Number
    })
    @IsNumberString()
    @IsOptional()
    page?: number

    @ApiPropertyOptional({
        title: "records_per_page",
        required: false,
        type: Number,
        default: 5
    })
    @IsNumberString()
    @IsOptional()
    records_per_page?: number

    @ApiProperty({
        title: "search",
        required: true,
        type: String
    })
    @IsNotEmpty()
    @IsString()
    search: string
}