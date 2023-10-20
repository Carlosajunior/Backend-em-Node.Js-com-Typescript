import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Customer } from "../../entities/customer.entity";

export class UpdateContactDTO {
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    contact_id: string

    @IsUUID()
    @IsOptional()
    @ApiProperty()
    customer_id: string;

    @MaxLength(100)
    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string;

    @MaxLength(16)
    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false
    })
    phone?: string;

    @MaxLength(15)
    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false
    })
    cellphone?: string;

    @MaxLength(70)
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;

    @MaxLength(100)
    @IsOptional()
    @IsString()
    @ApiProperty()
    role: string;

    @MaxLength(100)
    @IsOptional()
    @IsString()
    @ApiProperty()
    departament: string;

    @IsOptional()
    @ApiProperty({
        type: Boolean,
        required: false
    })
    is_admin?: boolean;

    customer?: Customer;
}