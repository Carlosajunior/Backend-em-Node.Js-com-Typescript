import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { textSearchByFields } from 'typeorm-text-search';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { SearchWithFiltersDTO } from '../dtos/search-with-filters.dto';
import { BooleanStatus } from '../../profiles/contansts';

@EntityRepository(Profile)
export class SearchProfilesRepository extends Repository<Profile> {
  async countProfiles(condition?: string): Promise<number> {
    return condition
      ? createQueryBuilder<Profile>('profile').where(condition).getCount()
      : createQueryBuilder<Profile>('profile').getCount();
  }

  async findProfiles(
    query: SearchWithFiltersDTO | undefined
  ): Promise<ListEntitiesModel<Profile>> {
    const {
      page,
      records_per_page: recordsPerPage,
      search,
      uds,
      impedido
    } = query;
    let last_page = (page - 1) * recordsPerPage > 0 ? page - 1 : null

    const profiles = await createQueryBuilder<Profile>('Profile')
      .leftJoinAndSelect('Profile.tags', 'tags')
      .leftJoinAndSelect('tags.tag', 'tag')
      .leftJoinAndSelect('Profile.tags', 'new_tags')
      .leftJoinAndSelect('new_tags.tag', 'new_tag')
      .leftJoinAndSelect('Profile.attachments', 'attachments')
      .leftJoinAndSelect('Profile.experiences', 'experiences')
      .leftJoinAndSelect('Profile.formations', 'formations')
      .leftJoinAndSelect('Profile.languages', 'languages')
      .leftJoinAndSelect('Profile.references', 'references')
      .leftJoinAndSelect('Profile.social_medias', 'social_medias')
      .leftJoinAndSelect('Profile.observations', 'observations')
      .addSelect(
        `CASE WHEN (Profile.phone <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'phone_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.cpf <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'cpf_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.birthdate <> NULL) IS NOT TRUE THEN 1 ELSE 2 END`,
        'birthdate_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.mother_name <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'mother_name_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.gender <> NULL) IS NOT TRUE THEN 1 ELSE 2 END`,
        'gender_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.cep <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'cep_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.state <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'state_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.city <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'city_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.accept_contract <> NULL) IS NOT TRUE THEN 1 ELSE 2 END`,
        'accept_contract_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.clt_claim <> NULL) IS NOT TRUE THEN 1 ELSE 2 END`,
        'clt_claim_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.pj_claim <> NULL) IS NOT TRUE THEN 1 ELSE 2 END`,
        'pj_claim_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.quati_result <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'quati_result_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.disc2_result <> '') IS NOT TRUE THEN 1 ELSE 2 END`,
        'disc2_result_sort'
      )
      .addSelect(
        `CASE WHEN (Profile.homeoffice <> NULL) IS NOT TRUE THEN 1 ELSE 2 END`,
        'homeoffice_sort'
      )
      .addOrderBy('phone_sort', 'DESC')
      .addOrderBy('cpf_sort', 'DESC')
      .addOrderBy('birthdate_sort', 'DESC')
      .addOrderBy('mother_name_sort', 'DESC')
      .addOrderBy('gender_sort', 'DESC')
      .addOrderBy('cep_sort', 'DESC')
      .addOrderBy('state_sort', 'DESC')
      .addOrderBy('city_sort', 'DESC')
      .addOrderBy('accept_contract_sort', 'DESC')
      .addOrderBy('clt_claim_sort', 'DESC')
      .addOrderBy('pj_claim_sort', 'DESC')
      .addOrderBy('quati_result_sort', 'DESC')
      .addOrderBy('disc2_result_sort', 'DESC')
      .addOrderBy('homeoffice_sort', 'DESC')
      .addOrderBy('Profile.created_at', 'DESC');

    if (uds) {
      profiles.andWhere('Profile.uds = :uds', { uds });
    }
    if (impedido) {
      profiles.andWhere('Profile.impedido = :impedido', { impedido });
    }

    textSearchByFields<Profile>(profiles, search, [
      'Profile.name',
      'Profile.professional_title',
      'Profile.city',
      'tag.name'
    ]);

    if ((!impedido || impedido === BooleanStatus.False) && (!uds || uds === BooleanStatus.False)) {
      profiles.orWhere(`Profile.identify ilike '%${search}%'`);
    }
    profiles.andWhere('Profile.active = true')
    const profileCount = await profiles.getCount();
    profiles.take(recordsPerPage);
    profiles.skip((page - 1) * recordsPerPage);

    const getValue = await profiles.getMany();

    return {
      page,
      last_page,
      results: getValue,
      total_results_per_page: recordsPerPage,
      total_results: profileCount,
      total_pages: Math.ceil(profileCount / recordsPerPage)
    };
  }
}
