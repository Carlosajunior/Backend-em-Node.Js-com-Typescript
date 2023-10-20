import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { FunnelConstants } from "../constants";

export class UpdateFunnelDto {
    @MaxLength(100)
    @IsOptional()
    @ApiPropertyOptional({
        title: "name",
        required: false,
        type: String
    })
    name: string;

    @IsEnum(FunnelConstants)
    @IsOptional()
    @ApiPropertyOptional({
        title: "status",
        required: false,
        enum: FunnelConstants
    })
    status: FunnelConstants;

    @IsOptional()
    @IsArray()
    @IsObject({ each: true })
    @ApiPropertyOptional({
        title: "columns",
        required: false,
        isArray: true
    })
    columns?: {
        id: string,
        index: number,
        name: string,
        postinterview: boolean,
        pretinterview: boolean
    }[];

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        title: "created_by",
        required: false,
        type: String
    })
    created_by?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        title: "username_id",
        required: false,
        type: String
    })
    username_id?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        title: "creator_id",
        required: false,
        type: String
    })
    creator_id?: string;
}
