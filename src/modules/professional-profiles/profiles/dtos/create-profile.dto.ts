import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, IsUrl, Matches, MaxLength, ValidateNested } from 'class-validator';
import { TagsToProfile } from '@/modules/common/tags/entities';
import { Attachment } from '@/modules/professional-profiles/attachments/entities';
import { CreateExperienceDTO } from '@/modules/professional-profiles/experiences/dtos';
import { Experience } from '@/modules/professional-profiles/experiences/entities';
import { CreateFormationDTO } from '@/modules/professional-profiles/formations/dtos';
import { Formation } from '@/modules/professional-profiles/formations/entities';
import { CreateLanguageDTO } from '@/modules/professional-profiles/languages/dtos';
import { Language } from '@/modules/professional-profiles/languages/entities';
import { CreateObservationDTO } from '@/modules/professional-profiles/observations/dtos';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { BooleanStatus, ProfileAcceptContract, ProfileGender } from '@/modules/professional-profiles/profiles/contansts';
import { CreateReferenceDTO } from '@/modules/professional-profiles/references/dtos';
import { Reference } from '@/modules/professional-profiles/references/entities';
import { CreateSocialMediaDTO } from '@/modules/professional-profiles/social-medias/dtos';
import { SocialMedia } from '@/modules/professional-profiles/social-medias/entities';
import { User } from '@/modules/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProfileOrigin } from '../contansts/profile-origin.constant';
import { State } from '@/modules/customers/entities/customer.entity';

export class CreateProfileDTO {
  @MaxLength(70)
  @IsNotEmpty()
  @ApiProperty({
    title: "name",
    required: true,
    type: String,
    maxLength: 70
  })
  @Transform((nameProp) => nameProp.value.trim())
  name: string;

  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "phone",
    required: false,
    type: String
  })
  @Transform((prop) => (prop?.value ? prop.value : null))
  phone?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiPropertyOptional({
    title: "email",
    required: true,
    type: String
  })
  email: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$| *$/)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "cpf",
    required: false,
    type: String
  })
  @Transform((prop) => (prop?.value ? prop.value : ""))
  cpf?: string

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "birthdate",
    required: false,
    type: String
  })
  @Transform((prop) => (prop?.value ? prop.value : null))
  birthdate?: Date;

  @MaxLength(70)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "mother_name",
    required: false,
    type: String,
    maxLength: 70
  })
  @Transform((prop) => (prop?.value ? prop.value : ""))
  mother_name?: string;

  @IsEnum(ProfileGender)
  @IsOptional()
  @ApiPropertyOptional({
    title: "gender",
    required: false,
    enum: ProfileGender
  })
  gender?: ProfileGender;

  @Matches(/[0-9]{5}-[0-9]{3}| *$/)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "cep",
    required: false,
    type: String
  })
  @Transform((prop) => (prop?.value ? prop.value : ""))
  cep?: string;

  @IsOptional()
  @IsEnum(State)
  @ApiPropertyOptional({
    title: "state",
    required: false,
    enum: State
  })
  @Transform((prop) => (prop?.value ? prop.value : null))
  state?: State;

  @MaxLength(60)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "city",
    required: false,
    type: String,
    maxLength: 60
  })
  city?: string;

  @IsEnum(ProfileAcceptContract)
  @IsOptional()
  @ApiPropertyOptional({
    title: "accept_contract",
    required: false,
    enum: ProfileAcceptContract,
    type: ProfileAcceptContract
  })
  @Transform((prop) => (prop?.value ? prop.value : null))
  accept_contract?: ProfileAcceptContract;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    title: "clt_claim",
    required: false,
    type: String
  })
  @Transform((prop) => { return prop?.value ? parseFloat(prop.value) : null })
  clt_claim?: number

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    title: "pj_claim",
    required: false,
    type: String
  })
  @Transform((prop) => { return prop?.value ? parseFloat(prop.value) : null })
  pj_claim?: number

  @MaxLength(220)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "professional_title",
    required: false,
    type: String,
    maxLength: 220
  })
  professional_title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "professional_about",
    required: false,
    type: String
  })
  professional_about?: string;

  @MaxLength(300)
  @IsUrl()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "quati_result",
    required: false,
    type: String,
    maxLength: 300
  })
  quati_result?: string;

  @MaxLength(300)
  @IsUrl()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "disc2_result",
    required: false,
    type: String,
    maxLength: 300
  })
  disc2_result?: string;

  @IsEnum(BooleanStatus, {
    message: 'Necessário envio de um boolean true ou false.'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "homeoffice",
    required: false,
    type: BooleanStatus,
    enum: BooleanStatus
  })
  homeoffice?: BooleanStatus;

  @IsEnum(BooleanStatus, {
    message: 'Necessário envio de um boolean true ou false.'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "uds",
    required: false,
    type: BooleanStatus,
    enum: BooleanStatus
  })
  uds?: BooleanStatus;

  @IsEnum(BooleanStatus, {
    message: 'Necessário envio de um boolean true ou false.'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "impedido",
    required: false,
    type: BooleanStatus,
    enum: BooleanStatus
  })
  impedido?: BooleanStatus;

  @IsOptional()
  @ArrayNotEmpty()
  @IsArray()
  @ApiPropertyOptional({
    title: "tags_ids",
    required: false,
    isArray: true
  })
  tag_ids?: {
    id: string;
    tag_id: string;
    experience_time: string;
    spotlight?: boolean;
  }[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateExperienceDTO)
  @ApiPropertyOptional({
    title: "experiences",
    required: false,
    isArray: true,
    type: Array<Experience>
  })
  experiences?: Experience[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormationDTO)
  @ApiPropertyOptional({
    title: "formations",
    required: false,
    isArray: true,
    type: Array<Formation>
  })
  formations?: Formation[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDTO)
  @ApiPropertyOptional({
    title: "languages",
    required: false,
    isArray: true,
    type: Array<Language>
  })
  languages?: Language[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateReferenceDTO)
  @ApiPropertyOptional({
    title: "references",
    required: false,
    isArray: true,
    type: Array<Reference>
  })
  references?: Reference[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSocialMediaDTO)
  @ApiPropertyOptional({
    title: "social_medias",
    required: false,
    isArray: true,
    type: Array<SocialMedia>
  })
  social_medias?: SocialMedia[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateObservationDTO)
  @ApiPropertyOptional({
    title: "observations",
    required: false,
    isArray: true,
    type: Array<Observation>
  })
  observations?: Observation[];

  @IsEnum(ProfileOrigin, {
    message: 'É necessário informar a origem do cadastro'
  })
  @IsEnum(ProfileOrigin)
  @IsNotEmpty()
  @ApiProperty({
    title: "origin",
    required: true,
    enum: ProfileOrigin
  })
  origin: ProfileOrigin;

  @IsEnum(BooleanStatus, {
    message: 'Necessário envio de um boolean true ou false.'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "verified",
    required: false,
    type: BooleanStatus,
    enum: BooleanStatus
  })
  verified?: BooleanStatus;

  @IsEnum(BooleanStatus, {
    message: 'Necessário envio de um boolean true ou false.'
  })
  @IsOptional()
  @ApiPropertyOptional({
    title: "open_to_work",
    required: false,
    type: BooleanStatus,
    enum: BooleanStatus
  })
  open_to_work?: BooleanStatus;

  @IsOptional()
  @IsNumberString()
  @Transform((prop) => (prop?.value ? prop.value : null))
  @ApiPropertyOptional({
    title: "category_id",
    required: false,
    type: String
  })
  category_id?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ApiPropertyOptional({
    title: "tags",
    required: false,
    isArray: true,
    type: Array<TagsToProfile>
  })
  tags?: TagsToProfile[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ApiPropertyOptional({
    title: "attachments",
    required: false,
    isArray: true,
    type: Array<Attachment>
  })
  attachments?: Attachment[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "created_by",
    required: false,
    type: String
  })
  created_by?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "username_id",
    required: false,
    type: String
  })
  username_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "creator_id",
    required: false,
    type: String
  })
  creator_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "creator",
    required: false,
    type: User
  })
  creator?: User;
}
