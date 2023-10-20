import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { textSearchByFields } from 'typeorm-text-search';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { DateOption } from '../constants/date-option.constant';
import { SearchVacanciesDTO } from '../dtos/search-vacancies.dto';
import { Vacancy } from '../entities/vacancy.entity';
import { VacancyMapper } from '../mappers/vacancy.mapper';
import { VacancyModel } from '../models/vacancy.model';

@EntityRepository(Vacancy)
export class VacancyRepository extends Repository<Vacancy> {

  private queryBuilder(): SelectQueryBuilder<Vacancy> {
    return this.createQueryBuilder('Vacancies')
      .leftJoinAndSelect('Vacancies.commercial', 'commercial')
      .leftJoinAndSelect('Vacancies.customer', 'customer')
      .leftJoinAndSelect('Vacancies.vacancy_languages', 'language')
      .leftJoinAndSelect('customer.logo', 'logo')
      .leftJoinAndSelect('Vacancies.recruiter', 'recruiter')
      .leftJoinAndSelect('Vacancies.tags', 'tag')
      .loadRelationCountAndMap(
        'Vacancies.total_sent_to_client',
        'Vacancies.observations',
        'total',
        (qb) =>
          qb.leftJoin('total.column', 'c').where('c.name IN(:...columns)', {
            columns: [
              'Enviados para o cliente',
              'Entrevista agendada',
              'Entrevistados aguardando feedback',
              'Aprovado'
            ]
          })
      )
      .addOrderBy('Vacancies.created_at', 'DESC');
  }

  public async paginateByParams({
    page = 1,
    records_per_page = 15,
    ...query
  }: SearchVacanciesDTO): Promise<ListEntitiesModel<VacancyModel>> {
    const queryBuilder = this.queryBuilder();

    if (query?.title) {
      queryBuilder.andWhere(`Vacancies.title ilike '%${query.title.trim()}%'`);
    }

    if (query?.identify) {
      queryBuilder.andWhere('Vacancies.identify = :identify', {
        identify: query.identify.trim()
      });
    }

    if (query?.customer_name) {
      queryBuilder.andWhere(
        `customer.name ilike '%${query.customer_name.trim()}%'`
      );
    }

    if (query?.experience_levels?.length > 0) {
      queryBuilder.andWhere('Vacancies.experience IN(:...experience_levels)', {
        experience_levels: query.experience_levels
      });
    }

    query?.languages?.forEach((lang) => {
      queryBuilder.orWhere(
        'language.language_id = :id',
        {
          id: lang
        }
      );
    });

    if (query?.contract_models?.length > 0) {
      queryBuilder.andWhere(
        'Vacancies.contract_model IN (:...contract_models)',
        {
          contract_models: query.contract_models
        }
      );
    }

    if (query?.tags?.length > 0) {
      queryBuilder.andWhere('tag.name IN (:...names)', { names: query.tags });
    }

    if (query?.work_modes?.length > 0) {
      queryBuilder.andWhere('Vacancies.work_model IN (:...work_modes)', {
        work_modes: query.work_modes
      });
    }

    if (query?.state) {
      queryBuilder.andWhere('Vacancies.state = :state', {
        state: query.state
      });
    }

    if (query?.city) {
      queryBuilder.andWhere('Vacancies.city = :city', {
        city: query.city
      });
    }

    if (query?.partner_company) {
      queryBuilder.andWhere(
        `Vacancies.partner_company ilike '%${query.partner_company.trim()}%'`
      );
    }

    if (query?.date_option) {
      if (query.date_option === DateOption.BETWEEN) {
        if (query?.date_start && query?.date_end) {
          queryBuilder.andWhere(
            `CAST(Vacancies.expire_at AS DATE) between '${query.date_start}' and '${query.date_end}'`
          );
        }
      }

      if (query.date_option === DateOption.LESS_THAN && query?.date) {
        queryBuilder.andWhere(
          `CAST(Vacancies.expire_at AS DATE) < '${query.date}'`
        );
      }

      if (query.date_option === DateOption.BIGGER_THAN && query?.date) {
        queryBuilder.andWhere(
          `CAST(Vacancies.expire_at AS DATE) > '${query.date}'`
        );
      }

      if (query.date_option === DateOption.EQUAL_TO && query?.date) {
        queryBuilder.andWhere(
          `CAST(Vacancies.expire_at AS DATE) = '${query.date}'`
        );
      }
    }

    if (!query?.status || query?.status?.length === 0) {
      query.status = ['Aberto'];
    }

    queryBuilder.andWhere('Vacancies.status IN(:...status)', {
      status: query.status
    });

    if (query?.project_time) {
      queryBuilder.andWhere(
        `Vacancies.project_time ilike '%${query.project_time.trim()}%'`
      );
    }

    const total_results = await queryBuilder.getCount();
    queryBuilder.take(records_per_page);
    queryBuilder.skip((page - 1) * records_per_page);

    const total_pages = Math.ceil(total_results / Number(records_per_page));

    const vacancies = await queryBuilder.getMany();

    return {
      page: Number(page),
      results: vacancies?.map((vacancy) => VacancyMapper.toMap(vacancy)),
      total_pages,
      total_results: total_results,
      total_results_per_page: Number(records_per_page)
    };
  }

  public async paginateBySearch({
    page = 1,
    records_per_page = 15,
    search = ''
  }: SearchVacanciesDTO): Promise<ListEntitiesModel<VacancyModel>> {
    const queryBuilder = this.queryBuilder();

    textSearchByFields<Vacancy>(queryBuilder, search.trim(), [
      'Vacancies.title',
      'Vacancies.identify',
      'customer.name',
      'Vacancies.partner_company'
    ]);

    queryBuilder.andWhere('Vacancies.status = :status', {
      status: 'Aberto'
    });

    const total_results = await queryBuilder.getCount();
    queryBuilder.take(records_per_page);
    queryBuilder.skip((page - 1) * records_per_page);

    const total_pages = Math.ceil(total_results / Number(records_per_page));
    const vacancies = await queryBuilder.getMany();

    return {
      page: Number(page),
      results: vacancies?.map((vacancy) => VacancyMapper.toMap(vacancy)),
      total_pages,
      total_results: total_results,
      total_results_per_page: Number(records_per_page)
    };
  }
}
