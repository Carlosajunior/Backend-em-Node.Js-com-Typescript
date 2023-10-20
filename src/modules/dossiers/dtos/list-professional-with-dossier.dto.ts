import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { DossierStatus } from "../constants/dossier-status.constant";

export class ListProfessionalsWithDossierDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        title: "search",
        required: true,
        type: String
    })
    search: DossierStatus

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