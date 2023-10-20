import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsUUID } from "class-validator";
import { SenderDTO } from "./sender.dto";

export class SendOfferLetterDTO {
    @ApiProperty({
        title: 'offer_letter_id',
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    offer_letter_id: string

    @ApiProperty({
        title: 'template_id',
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    template_id: string

    @ApiProperty({
        title: 'vacancy_id',
        type: Number,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    vacancy_id: number

    @ApiProperty({
        title: 'profile_id',
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    profile_id: string

    @ApiProperty({
        title: 'sender',
        type: SenderDTO,
        required: true
    })
    @IsNotEmpty()
    @IsObject()
    sender: SenderDTO;
}