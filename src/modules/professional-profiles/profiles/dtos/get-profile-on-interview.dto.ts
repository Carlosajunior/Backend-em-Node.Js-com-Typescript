import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";

export class GetProfilesOnInterviewDTO {
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