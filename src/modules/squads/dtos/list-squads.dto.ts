import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsOptional, IsString } from "class-validator"

export class ListSquadsDTO {
    @ApiProperty({
        title: "page",
        type: Number,
        required: false
    })
    @IsNumberString()
    @IsOptional()
    page?: number

    @ApiProperty({
        title: "records_per_page",
        type: Number,
        required: false
    })
    @IsNumberString()
    @IsOptional()
    records_per_page?: number

    @ApiProperty({
        title: "search",
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    search?: string
}