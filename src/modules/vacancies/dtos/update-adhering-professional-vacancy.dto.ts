import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAdheringProfessionalsOnVacancyDTO {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        name: 'vacancy_id',
        type: Number,
        required: true
    })
    vacancy_id: number
}