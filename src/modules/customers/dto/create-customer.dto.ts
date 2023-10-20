import Funnel from '@/modules/funnel/entities/funnel.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { ContactDto } from '../contact/dto/contact.dto';
import Contact from '../contact/entities/contact.entity';
import { State } from '../entities/customer.entity';
import { LogoModel } from '../logo/model/logo.model';

export class CreateCustomerDto {
  @ApiPropertyOptional({
    title: "contracts",
    required: false,
    isArray: true,
    type: Array<LogoModel>
  })
  contracts?: LogoModel[];

  @ApiProperty({
    title: "name",
    required: true,
    type: String
  })
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    title: "phone",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : null))
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
  phone?: string;

  @ApiPropertyOptional({
    title: "email",
    required: false,
    type: String
  })
  @MaxLength(70)
  @IsOptional()
  @IsEmail()
  @Transform((prop) => (prop?.value ? prop.value : null))
  email?: string;

  @ApiPropertyOptional({
    title: "document",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  document: string;

  @ApiPropertyOptional({
    title: "state",
    required: false,
    enum: State
  })
  @IsOptional()
  @IsEnum(State)
  @Transform((prop) => (prop?.value ? prop.value : null))
  state?: State;

  @ApiPropertyOptional({
    title: "city",
    required: false,
    type: String
  })
  @MaxLength(60)
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  city?: string;

  @ApiPropertyOptional({
    title: "notes",
    required: false,
    type: String
  })
  @MaxLength(500)
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  notes?: string;

  @ApiPropertyOptional({
    title: "logo",
    required: false,
  })
  @IsOptional()
  logo?: LogoModel;

  @ApiPropertyOptional({
    title: "funnelsId",
    required: false,
    isArray: true,
    type: Array<String>
  })
  @IsArray()
  @IsOptional()
  funnelsId?: string[];

  @ApiPropertyOptional({
    title: "funnels",
    required: false,
    isArray: true,
    type: Array<Funnel>
  })
  @IsOptional()
  @IsArray()
  funnels?: Funnel[];

  @ApiPropertyOptional({
    title: "contacts",
    required: false,
    isArray: true,
    type: Array<Contact>
  })
  @Type(() => ContactDto)
  @IsArray()
  @IsOptional()
  contacts?: Contact[];

  @ApiPropertyOptional({
    title: "created_by",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  created_by?: string;

  @ApiPropertyOptional({
    title: "username_id",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  username_id?: string;

  @ApiPropertyOptional({
    title: "clt_benefits",
    required: false,
    type: String
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  clt_benefits?: string;

  @ApiPropertyOptional({
    title: "pj_benefits",
    required: false,
    type: String
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  pj_benefits?: string;

  @ApiPropertyOptional({
    title: "expiration_date",
    required: false,
    isArray: true,
    type: Array<Date>
  })
  @IsArray()
  @IsOptional()
  @IsArray()
  expiration_date?: Date[];

  @ApiPropertyOptional({
    title: "observations",
    required: false,
    isArray: true,
    type: Array<String>
  })
  @IsOptional()
  @IsArray()
  observations?: string[];

  @ApiPropertyOptional({
    title: "creator_id",
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  @Transform((prop) => (prop?.value ? prop.value : ""))
  creator_id?: string;
}
