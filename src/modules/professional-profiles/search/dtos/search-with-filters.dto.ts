import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { BooleanStatus } from "../../profiles/contansts";
import { SearchProfileDTO } from "./search.dto";

export class SearchWithFiltersDTO extends SearchProfileDTO {
    @IsOptional()
    @IsEnum(BooleanStatus)
    @ApiPropertyOptional({
        title: "uds",
        required: false,
        enum: BooleanStatus
    })
    uds?: BooleanStatus

    @IsOptional()
    @IsEnum(BooleanStatus)
    @ApiPropertyOptional({
        title: "impedido",
        required: false,
        enum: BooleanStatus
    })
    impedido?: BooleanStatus
}