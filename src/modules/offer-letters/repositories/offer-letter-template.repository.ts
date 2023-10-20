import { ListEntitiesModel } from '@/modules/common/shared/models';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { textSearchByFields } from 'typeorm-text-search';
import { TemplateStatus } from '../constants/template-status.constant';
import { SearchOfferLettersTemplatesLisDTO } from '../dtos/search-offer-letters-templates-list.dto';
import { OfferLetterTemplate } from '../entities/offer-letter-template.entity';

@EntityRepository(OfferLetterTemplate)
export class OfferLetterTemplateRepository extends Repository<OfferLetterTemplate> {
  queryBuilder(): SelectQueryBuilder<OfferLetterTemplate> {
    return this.createQueryBuilder('o').orderBy('o.created_at', 'DESC');
  }

  public async paginateBySearch({
    page = 1,
    records_per_page = 15,
    search = ''
  }: SearchOfferLettersTemplatesLisDTO): Promise<
    ListEntitiesModel<OfferLetterTemplate>
  > {
    const queryBuilder = this.queryBuilder();

    textSearchByFields<OfferLetterTemplate>(queryBuilder, search.trim(), [
      'o.title',
      'o.text'
    ]);

    queryBuilder.andWhere('o.status = :status', {
      status: TemplateStatus.ACTIVE
    });

    const total_results = await queryBuilder.getCount();
    queryBuilder.take(records_per_page);
    queryBuilder.skip((page - 1) * records_per_page);

    const total_pages = Math.ceil(total_results / Number(records_per_page));

    const results = await queryBuilder.getMany();

    return {
      page: Number(page),
      results,
      total_pages,
      total_results: total_results,
      total_results_per_page: Number(records_per_page)
    };
  }

  public async paginateByParams({
    page = 1,
    records_per_page = 15,
    ...query
  }: SearchOfferLettersTemplatesLisDTO): Promise<
    ListEntitiesModel<OfferLetterTemplate>
  > {
    const queryBuilder = this.queryBuilder();

    if (query?.status) {
      queryBuilder.andWhere('o.status = :status', {
        status: query.status
      });
    }

    if (query?.type_of_contract) {
      queryBuilder.andWhere('o.type_of_contract = :type_of_contract', {
        type_of_contract: query.type_of_contract
      });
    }

    if (query?.title) {
      queryBuilder.andWhere(`o.title ilike '%${query.title.trim()}%'`);
    }

    const total_results = await queryBuilder.getCount();
    queryBuilder.take(records_per_page);
    queryBuilder.skip((page - 1) * records_per_page);

    const total_pages = Math.ceil(total_results / Number(records_per_page));

    const results = await queryBuilder.getMany();

    return {
      page: Number(page),
      results,
      total_pages,
      total_results,
      total_results_per_page: Number(records_per_page)
    };
  }
}
