import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TemplateStatus } from '../constants/template-status.constant';
import { TypeOfContract } from '../constants/type-of-contract.constant';

export class SearchOfferLettersTemplatesLisDTO extends SearchProfileDTO {
  @IsNotEmpty()
  @IsEnum(TypeSearch)
  @ApiProperty({
    title: "type_search",
    required: true,
    enum: TypeSearch,
    default: TypeSearch.SEARCH
  })
  type_search: TypeSearch;

  @IsOptional()
  @ApiPropertyOptional({
    title: "status",
    required: false,
    enum: TemplateStatus
  })
  status?: TemplateStatus;

  @IsOptional()
  @ApiPropertyOptional({
    title: "title",
    required: false,
    type: String
  })
  @Transform((prop) => prop?.value?.trim())
  title: string;

  @IsOptional()
  @ApiPropertyOptional({
    title: "type_of_contract",
    required: false,
    enum: TypeOfContract
  })
  type_of_contract: TypeOfContract;
}
