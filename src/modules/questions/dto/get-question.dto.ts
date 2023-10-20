import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GetQuestionDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        title: "id",
        type: String,
        required: true
    })
    id: string
}