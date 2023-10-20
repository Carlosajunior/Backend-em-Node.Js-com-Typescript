import { queues } from '@/config/bull/bull';
import { elasticsearchService } from '@/config/elasticseach';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import {
  BR_STATES,
  State
} from '@/modules/common/shared/constants/br-states.constant';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { getRepository } from 'typeorm';
import { WorkModel } from '../../constants/work-model.constant';
import { Profile } from './../../../professional-profiles/profiles/entities/profile.entity';

export async function handleVacancyCandidates(entity: Vacancy) {
  const LIMIT = process.env.CANDIDATES_LIMIT || 100;
  const tags_ids = entity.tags.map((tag) => tag.id);
  let state: State;
  const states: string[] = [];
  let must: QueryDslQueryContainer[] = [];

  async function processCandidates(tag_ids: string[], page = 1, limit = LIMIT) {
    const skip = (page - 1) * +limit;

    const must_not: QueryDslQueryContainer[] = [
      {
        multi_match: {
          query: 'true',
          fields: ['uds', 'impedido']
        }
      },
      {
        match: {
          'observations.vacancy_id': entity.id
        }
      }
    ];
    const should: QueryDslQueryContainer[] = tag_ids.map((tag_id) => ({
      match: {
        'tags.tag_id': tag_id
      }
    }));

    if (entity.work_model !== WorkModel.REMOTE) {
      if (entity.city && entity.state) {
        state = BR_STATES.find((st) => st.initials === entity.state);

        Object.keys(state).forEach((key) => states.push(state[key]));

        must = [
          {
            query_string: {
              query: `city: ${entity.city} AND state: (${states?.join(' OR ')})`
            }
          }
        ];
      }
    }

    const query: QueryDslQueryContainer = {
      function_score: {
        query: {
          bool: {
            should,
            must,
            must_not
          }
        }
      }
    };

    const all = await elasticsearchService.search({
      index: ElasticSearchIndex.profile,
      from: skip,
      size: +limit,
      query,
      sort: ['_score']
    });

    for (const profile of all.hits.hits) {
      const professional: Profile = profile._source as Profile;

      const obs = await getRepository(Observation).find({
        where: {
          profile_id: professional.id,
          vacancy_id: entity.id
        }
      });

      if (obs?.length > 0) {
        return;
      }

      queues.insertCandidateIntoVacancyQueue.add(profile._id, {
        vacancy: entity,
        profile: profile._source
      });
    }
  }
  processCandidates(tags_ids);
}
