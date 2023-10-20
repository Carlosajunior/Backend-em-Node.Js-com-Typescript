import { BooleanStatus } from "@/modules/professional-profiles/profiles/contansts";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class EnableDisableUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(BooleanStatus, { message: 'Necessário envio de um boolean true ou false.' })
    enable: BooleanStatus
}