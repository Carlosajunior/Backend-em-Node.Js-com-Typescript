import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { OfferLetterStatusEnum } from "../constants/offer-letter-status.constant";

export class GetProfileByOfferLetterStatusDTO {
    @IsNotEmpty()
    @IsEnum(OfferLetterStatusEnum)
    @ApiPropertyOptional({
        title: "status",
        required: true,
        enum: OfferLetterStatusEnum,
    })
    status?: OfferLetterStatusEnum;

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