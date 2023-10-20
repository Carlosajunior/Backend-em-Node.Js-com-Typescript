import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { TagCategories } from "../constants/tag-categories.constants"

export class UpdateTagDTO {
    @MaxLength(70)
    @IsOptional()
    @IsString()
    @ApiProperty({
        title: "name",
        required: true,
        type: String
    })
    name: string

    @IsNotEmpty()
    @IsEnum(TagCategories)
    @ApiProperty({
        title: "category",
        required: true,
        enum: TagCategories
    })
    category: TagCategories
}
