import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { Service } from '@/modules/common/shared/core/service';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { Injectable } from '@nestjs/common';
import { SearchOfferLettersTemplatesLisDTO } from '../dtos/search-offer-letters-templates-list.dto';
import { OfferLetterTemplate } from '../entities/offer-letter-template.entity';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';

@Injectable()
export class ListOfferLetterTemplatesService
  implements
    Service<
      SearchOfferLettersTemplatesLisDTO,
      ListEntitiesModel<OfferLetterTemplate>
    >
{
  public constructor(
    private readonly offerLetterTemplateRepository: OfferLetterTemplateRepository
  ) {}

  public async execute(
    request: SearchOfferLettersTemplatesLisDTO
  ): Promise<ListEntitiesModel<OfferLetterTemplate>> {
    switch (request.type_search) {
      case TypeSearch.SEARCH: {
        return await this.offerLetterTemplateRepository.paginateBySearch(
          request
        );
      }
      case TypeSearch.PARAMS: {
        return await this.offerLetterTemplateRepository.paginateByParams(
          request
        );
      }
      default:
        return null;
    }
  }
}
