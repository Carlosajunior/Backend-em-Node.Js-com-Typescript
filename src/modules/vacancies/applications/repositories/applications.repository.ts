import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';

import { ListEntitiesModel, ListSearchModel } from '@/modules/common/shared/models';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { Vacancy } from '../../entities/vacancy.entity';
import { ApplyDTO } from '../dtos';
import { FilterApplicationsDTO } from '../dtos/filter-applications.dto';

@EntityRepository(Profile)
export class ApplicationsRepository extends Repository<Profile> {
  // Efetuado query statement para busca das vagas por parâmetro
  async findVacancies(query: ApplyDTO): Promise<ListEntitiesModel<Profile>> {
    const { page, records_per_page, vacancy_id } = query;
    const array = [];
    const condition = `vacancies.id = '${vacancy_id}' AND Observation.column IS NULL`;
    const applications = await createQueryBuilder<Observation>('Observation')
      .leftJoinAndSelect('Observation.profile', 'profile')
      .leftJoinAndSelect('Observation.vacancy', 'vacancies')
      .leftJoinAndSelect('profile.languages', 'language')
      .leftJoinAndSelect('profile.tags', 'profile_tags')
      .leftJoinAndSelect('profile_tags.tag', 'tag')
      .leftJoinAndSelect('vacancies.tags', 'tags')
      .leftJoinAndSelect('vacancies.customer', 'customer')
      .leftJoinAndSelect('customer.contacts', 'contacts')
      .where(condition)
      .andWhere('profile.active = true')
      .take(records_per_page)
      .skip((page - 1) * records_per_page)
      .getMany();
    const applicationsCount = applications.length;
    applications.forEach((value) => {
      const application_id = value.id;
      const vacancy_id = value.vacancy.id;
      const vacancy_code = value.vacancy?.identify;
      const column_id = value.column_id;
      const linked_by = value.linked_by;
      const newArray = [];
      value.profile?.tags.forEach((map) => {
        if (
          value.vacancy?.tags.find((a) => a.name === map.tag.name) !== undefined
        ) {
          newArray.push(true);
        }
      });

      const adhesion = Math.round(
        (newArray.length / value.vacancy?.tags.length) * 100
      );
      array.push({
        ...value?.profile,
        application_id,
        vacancy_tags: value.vacancy?.tags,
        vacancy_id,
        column_id,
        vacancy_code,
        linked_by,
        adhesion: adhesion > 100 ? 100 : adhesion
      });
    });
    return {
      page,
      results: array.sort((a, b) => (a.adhesion < b.adhesion ? 1 : -1)),
      total_results_per_page: records_per_page,
      total_results: applicationsCount,
      total_pages: Math.ceil(applicationsCount / records_per_page)
    };
  }

  async findAdhering(query: ApplyDTO): Promise<ListEntitiesModel<Profile>> {
    const { records_per_page, page, vacancy_id } = query;
    const array = [];
    const condition = `vacancies.id = '${vacancy_id}'`;
    const applications = await createQueryBuilder<Observation>('Observation')
      .select([
        'Observation.vacancy_id',
        'Observation.profile_id',
        'Observation.id',
        'vacancies.title',
        'vacancies.id',
        'vacancies.identify',
        'profile.id',
        'profile.photo_url',
        'profile.name',
        'profile.email',
        'profile.phone',
        'profile.professional_title',
        'profile.state',
        'profile.city',
        'profile.pj_claim',
        'profile.clt_claim',
        'profile.identify',
        'profile.uds',
        'profile.impedido',
        'profile.verified',
        'profile.created_by',
        'tag.name',
        'tag.id',
        'tags.name',
        'tags.id'
      ])
      .leftJoin('Observation.profile', 'profile')
      .leftJoin('Observation.vacancy', 'vacancies')
      .leftJoinAndSelect('profile.tags', 'profile_tags')
      .leftJoin('profile_tags.tag', 'tag')
      .leftJoin('vacancies.tags', 'tags')
      .where(condition)
      .andWhere('profile.active = true')
      .take(records_per_page)
      .skip((page - 1) * records_per_page)
      .getManyAndCount();
    const applicationsCount = applications[1];
    applications[0].forEach((value) => {
      const application_id = value.id;
      const vacancy_id = value.vacancy.id;
      const vacancy_code = value.vacancy?.identify;
      const column_id = value.column_id;
      const linked_by = value.linked_by;
      const newArray = [];
      value.profile?.tags.forEach((map) => {
        if (
          value.vacancy?.tags.find((a) => a.name === map.tag.name) !== undefined
        ) {
          newArray.push(true);
        }
      });

      const adhesion = Math.round(
        (newArray.length / value.vacancy?.tags.length) * 100
      );
      array.push({
        ...value?.profile,
        application_id,
        vacancy_tags: value.vacancy?.tags,
        vacancy_id,
        column_id,
        vacancy_code,
        linked_by,
        adhesion: adhesion > 100 ? 100 : adhesion
      });
    });
    return {
      page,
      results: array.sort((a, b) => (a.adhesion < b.adhesion ? 1 : -1)),
      total_results_per_page: records_per_page,
      total_results: applicationsCount,
      total_pages: Math.ceil(applicationsCount / records_per_page)
    };
  }

  async findVacanciesForRecruiter(
    query: ApplyDTO,
    linked_by: string
  ): Promise<ListEntitiesModel<Profile>> {
    const { page, records_per_page, vacancy_id } = query;
    const array = [];
    const condition = `vacancies.id = '${vacancy_id}'`;
    const condition2 = `Observation.linked_by = '${linked_by}'`;
    const applications = await createQueryBuilder<Observation>('Observation')
      .leftJoinAndSelect('Observation.profile', 'profile')
      .leftJoinAndSelect('Observation.vacancy', 'vacancies')
      .leftJoinAndSelect('profile.languages', 'language')
      .leftJoinAndSelect('profile.tags', 'profile_tags')
      .leftJoinAndSelect('profile_tags.tag', 'tag')
      .leftJoinAndSelect('vacancies.tags', 'tags')
      .where(condition)
      .andWhere(condition2)
      .andWhere('profile.active = true')
      .take(records_per_page)
      .skip((page - 1) * records_per_page)
      .getMany();
    const applicationsCount = applications.length;
    applications.forEach((value) => {
      const application_id = value.id;
      const vacancy_id = value.vacancy.id;
      const vacancy_code = value.vacancy?.identify;
      const column_id = value.column_id;
      const newArray = [];
      value.profile?.tags.forEach((map) => {
        if (
          value.vacancy?.tags.find((a) => a.name === map.tag.name) !== undefined
        ) {
          newArray.push(true);
        }
      });

      const adhesion = Math.round(
        (newArray.length / value.vacancy?.tags.length) * 100
      );

      array.push({
        ...value?.profile,
        application_id,
        vacancy_tags: value.vacancy?.tags,
        vacancy_id,
        column_id,
        vacancy_code,
        adhesion: adhesion > 100 ? 100 : adhesion
      });
    });
    return {
      page,
      results: array.sort((a, b) => (a.adhesion < b.adhesion ? 1 : -1)),
      total_results_per_page: records_per_page,
      total_results: applicationsCount,
      total_pages: Math.ceil(applicationsCount / records_per_page)
    };
  }

  // Efetuado query statement para busca de candidatos contendo estapas do funil
  async filterApplications(
    query: FilterApplicationsDTO
  ): Promise<ListSearchModel<Profile>> {
    const { records_limit, id, order_by, languages, work_modes, tags } = query;
    const array = [];
    const listApplies = [];

    const vacancyFunnels = await createQueryBuilder<Vacancy>(
      Vacancy,
      'Vacancies'
    )
      .leftJoinAndSelect('Vacancies.funnel', 'funnel')
      .leftJoinAndSelect('funnel.columns', 'columns')
      .where(`Vacancies.id = '${id}'`)
      .take(1)
      .getMany();

    const applications = createQueryBuilder<Observation>('Observation')
      .select(['Observation', 'dossier.dossier_status'])
      .leftJoin('Observation.dossier', 'dossier')
      .leftJoinAndSelect('Observation.profile', 'profile')
      .leftJoinAndSelect('Observation.vacancy', 'vacancies')
      .leftJoinAndSelect('profile.languages', 'language')
      .leftJoinAndSelect('profile.tags', 'profile_tags')
      .leftJoinAndSelect('profile_tags.tag', 'tag')
      .leftJoinAndSelect('vacancies.tags', 'tags')
      .leftJoinAndSelect('vacancies.funnel', 'funnel')
      .leftJoinAndSelect('vacancies.customer', 'customer')
      .leftJoinAndSelect('customer.contacts', 'contacts')
      .take(records_limit);

    if (id !== undefined) {
      applications.andWhere(`Vacancies.id = '${query.id}'`);
    }
    if (tags) {
      if (tags.length > 0) {
        applications.andWhere('tag.id IN(:...ids)', { ids: tags });
      }
    }

    if (languages) {
      if (languages.length > 0) {
        applications.andWhere('language.language IN(:...names)', {
          names: languages?.map((lang) => lang.split('-')[0]?.trim())
        });
        applications.andWhere('language.level IN(:...levels)', {
          levels: languages?.map((lang) => lang.split('-')[1]?.trim())
        });
      }
    }

    if (work_modes) {
      if (work_modes.length > 0) {
        applications.andWhere('profile.accept_contract IN(:...names)', {
          names: work_modes
        });
      }
    }
    applications.andWhere('profile.active = true')

    if (order_by == 'mais_recentes') {
      applications.orderBy('Observation.created_at', 'DESC');
    }

    const applicationsSelection = await applications.getMany();

    applicationsSelection.forEach((value) => {
      const tempArray = [];
      value.profile?.tags.forEach((map) => {
        if (
          value.vacancy?.tags.find((a) => a.id === map.tag.id) !== undefined
        ) {
          tempArray.push(true);
        }
      });

      const adhesion = Math.round(
        (tempArray.length / value.vacancy?.tags.length) * 100
      );
      array.push({
        ...value,
        adhesion: (adhesion) > 100 ? 100 : adhesion
      });
    });

    vacancyFunnels.forEach((value) => {
      value.funnel?.columns?.forEach((map) => {
        const tempArray = [];

        array.forEach((data) => {
          if (data.column_id === map.id) {
            tempArray.push(data);
          }
        });

        listApplies.push({
          ...map,
          vancacy_id: query.id,
          appy_count: tempArray.length,
          apply:
            order_by == 'maior_porcentagem'
              ? tempArray.sort((a, b) => b.adhesion - a.adhesion)
              : tempArray
        });
      });
    });

    const funnelCount = vacancyFunnels.length;
    return {
      results: listApplies?.sort((a, b) => (a.index > b.index ? 1 : -1)),
      search_limit: Math.ceil(query.records_limit),
      total_results: funnelCount
    };
  }

  async finApplicationsByProfileId(profile_id: string) {
    const application = await createQueryBuilder<Observation>('Observation')
      .select([
        'Observation.vacancy_id',
        'Observation.id',
        'vacancies.title',
        'vacancies.identify'
      ])
      .where('Observation.profile_id = :id', { id: profile_id })
      .andWhere('Observation.column_id IS NOT NULL')
      .leftJoin('Observation.vacancy', 'vacancies')
      .getOne();
    return application;
  }
}
