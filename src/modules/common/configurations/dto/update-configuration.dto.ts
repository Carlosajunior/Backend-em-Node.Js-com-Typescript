import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateConfigurationMatchPercentageDTO {
    @ApiProperty({
        title: 'configuration',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    configuration: string
}
