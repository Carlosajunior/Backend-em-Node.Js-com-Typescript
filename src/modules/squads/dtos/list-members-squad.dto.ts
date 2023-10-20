import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

export class listSquadMembersDTO {
    @ApiProperty({
        title: "squad_id",
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsUUID()
    squad_id: string

    @ApiProperty({
        title: "page",
        type: Number,
        required: false
    })
    @IsNumberString()
    @IsOptional()
    page?: number

    @ApiProperty({
        title: "records_per_page",
        type: Number,
        required: false
    })
    @IsNumberString()
    @IsOptional()
    records_per_page?: number

    @ApiProperty({
        title: "search",
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    search?: string

}