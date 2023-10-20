import { State } from '@/modules/customers/entities/customer.entity';
import {
  BooleanStatus,
  ProfileAcceptContract
} from '@/modules/professional-profiles/profiles/contansts';
import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator';
import { TypeSearch } from '../../shared/constants/type-search.constant';
import { TagCategories } from '../../tags/constants/tag-categories.constants';
import { Origins } from '../constants/origin-profile.constants';

export class SearchProfilesDTO extends SearchProfileDTO {
  @IsEnum(ProfileAcceptContract)
  @IsOptional()
  @ApiPropertyOptional({
    title: "accept_contract",
    required: false,
    enum: ProfileAcceptContract
  })
  accept_contract?: ProfileAcceptContract;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    title: "categories",
    required: false,
    isArray: true,
    type: Array<TagCategories>
  })
  categories?: TagCategories[];

  @IsOptional()
  @ApiPropertyOptional({
    title: "city",
    required: false,
    type: String
  })
  city?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({
    title: "from_claim",
    required: false,
    type: String
  })
  from_claim?: number;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    title: "to_claim",
    required: false,
    type: String
  })
  to_claim?: number;

  @IsOptional()
  @IsEnum(BooleanStatus)
  @ApiPropertyOptional({
    title: "home_office",
    required: false,
    enum: BooleanStatus
  })
  home_office?: BooleanStatus;

  @IsOptional()
  @IsEnum(BooleanStatus)
  @ApiPropertyOptional({
    title: "is_prevented",
    required: false,
    enum: BooleanStatus
  })
  is_prevented?: BooleanStatus;

  @IsOptional()
  @IsEnum(BooleanStatus)
  @ApiPropertyOptional({
    title: "is_verified",
    required: false,
    enum: BooleanStatus
  })
  is_verified?: BooleanStatus;

  @IsOptional()
  @ApiPropertyOptional({
    title: "languages",
    required: false,
    isArray: true,
    type: Array<string>
  })
  languages?: Array<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "office",
    required: false,
    type: String
  })
  office?: string;

  @IsOptional()
  @IsEnum(BooleanStatus)
  @ApiPropertyOptional({
    type: "open_to_work",
    required: false,
    enum: BooleanStatus
  })
  open_to_work?: BooleanStatus;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    title: "origin",
    required: false,
    isArray: true,
    type: Array<Origins>,
    enum: Origins
  })
  origin?: Origins[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "professional_title",
    required: false,
    type: String
  })
  professional_title?: string;

  @IsOptional()
  @IsEnum(State)
  @ApiPropertyOptional({
    title: "state",
    required: false,
    enum: State
  })
  state?: State;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    title: "tags",
    required: false,
    isArray: true,
    type: Array<string>
  })
  tags?: string[];

  @IsNotEmpty()
  @IsEnum(TypeSearch)
  @ApiProperty({
    title: "type_search",
    required: false,
    enum: TypeSearch
  })
  type_search: TypeSearch;

  @IsOptional()
  @IsEnum(BooleanStatus)
  @ApiProperty({
    title: "uds",
    required: false,
    enum: BooleanStatus
  })
  uds?: BooleanStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    type: String,
    title: "phone"
  })
  phone?: string

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    required: false,
    type: String,
    name: "email"
  })
  email?: string

  @IsOptional()
  @IsEnum(BooleanStatus)
  @ApiProperty({
    title: "contacted",
    required: false,
    enum: BooleanStatus
  })
  contacted?: BooleanStatus;
}

export type SearchProfilesByParamsDTO = Omit<
  SearchProfilesDTO,
  'page' | 'records_per_page' | 'search' | 'type_search'
>;
