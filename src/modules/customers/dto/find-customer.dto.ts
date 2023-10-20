import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class FindCustomerDTO {
    @ApiProperty({
        title: "id",
        required: false,
        type: String
    })
    @IsNotEmpty()
    @IsUUID()
    id: string
}