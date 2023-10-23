import { Type } from "class-transformer";
import { Max, IsOptional, Min, IsString, MinLength, IsNumber, IsBoolean } from "class-validator";

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
    @IsBoolean()
    status: boolean
}