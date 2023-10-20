import { BooleanStatus } from "@/modules/professional-profiles/profiles/contansts";
import { Type } from "class-transformer";
import { Max, IsNumberString, IsOptional, Min, IsString, MinLength, IsNumber, IsEnum } from "class-validator";

export class ListUsersDTO {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(60)
    limit: number

    @IsOptional()
    @IsString()
    @MinLength(1)
    pagination_token: string

    @IsOptional()
    @IsEnum(BooleanStatus)
    status: BooleanStatus
}