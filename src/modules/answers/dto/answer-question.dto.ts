import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateAnswerDTO } from "./create-answer.dto";

export class AnswerQuestionDTO {
    @ApiProperty({
        title: 'answers',
        type: Array<CreateAnswerDTO>,
        required: true,
        isArray: true
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayNotEmpty()
    @Type(() => CreateAnswerDTO)
    answers: CreateAnswerDTO[]
}