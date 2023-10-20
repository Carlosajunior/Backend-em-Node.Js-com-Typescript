import { BooleanStatus } from "@/modules/professional-profiles/profiles/contansts";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSquadDTO {
    @ApiPropertyOptional({
        title: "name",
        required: false,
        type: String
    })
    @IsOptional()
    @IsString()
    name?: string

    @ApiPropertyOptional({
        title: "is_active",
        required: false,
        enum: BooleanStatus
    })
    @IsOptional()
    @IsEnum(BooleanStatus, { message: 'Necessário envio de um boolean true ou false.' })
    is_active?: BooleanStatus

    @ApiProperty({
        title: "id",
        required: true,
        type: String
    })
    @IsNotEmpty()
    @IsUUID()
    id: string
}