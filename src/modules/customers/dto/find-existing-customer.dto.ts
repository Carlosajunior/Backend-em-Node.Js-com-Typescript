import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";
import { ExistingCustomerQuery } from "../interface/find-existing-customer-query.interface";

export default class findExistingCustomerDTO implements ExistingCustomerQuery {
    @ApiPropertyOptional({
        title: "document",
        required: false,
        type: String
    })
    @IsOptional()
    @IsString()
    document?: string;

    @ApiPropertyOptional({
        title: "email",
        required: false,
        type: String
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({
        title: "phone",
        required: false,
        type: String
    })
    @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    @IsOptional()
    @IsString()
    phone?: string;
}