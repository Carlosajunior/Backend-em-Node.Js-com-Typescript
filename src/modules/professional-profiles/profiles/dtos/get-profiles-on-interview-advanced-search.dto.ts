import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBooleanString, IsEmail, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetProfilesOnInterviewAdvancedSearchDTO {
    @IsOptional()
    @IsBooleanString()
    @ApiPropertyOptional({
        title: "on_interview",
        required: false,
        type: Boolean
    })
    on_interview?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        title: "name",
        required: false,
        type: String
    })
    name?: string;

    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional({
        title: "email",
        required: false,
        type: String
    })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        title: "vacancy_title",
        required: false,
        type: String
    })
    vacancy_title?: string;

    @IsNumberString()
    @IsOptional()
    @ApiPropertyOptional({
        title: "page",
        required: false,
        default: '1',
        type: String
    })
    page?: number;

    @IsNumberString()
    @IsOptional()
    @ApiPropertyOptional({
        title: "records_per_page",
        required: false,
        default: '15',
        type: String
    })
    records_per_page?: number;
}