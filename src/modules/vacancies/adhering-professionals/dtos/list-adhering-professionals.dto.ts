import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Tag } from './../../../common/tags/entities/tag.entity';

export class ListAdheringProfessionalsDTO extends SearchProfileDTO {
  @IsInt()
  @IsNotEmpty()
  @Transform((prop) => Number(prop.value))
  vacancy_id: number;
}

export class ListAdheringProfessionalsWithVacancyTagsDTO extends ListAdheringProfessionalsDTO {
  tags: Tag[];
}
