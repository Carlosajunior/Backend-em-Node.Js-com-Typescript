import { SearchDTO } from '@/modules/messages/dtos';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import {
  AggregationsAggregate,
  QueryDslBoolQuery,
  QueryDslQueryContainer,
  SearchResponse,
  SearchTotalHits
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ListEntitiesModel } from '../../shared/models';
import {
  generateSearchFilter,
  getWordsCombination
} from '../constants/functions';

export type SearchFields = {
  name: string;
  weight: number;
  keyword?: boolean;
};

const PROFILE_QUERY_FIELDS: SearchFields[] = [
  { name: 'name', weight: 55, keyword: true },
  { name: 'tags.tag.name', weight: 30, keyword: true },
  { name: 'experiences.company', weight: 10, keyword: true },
  { name: 'formations.course', weight: 10, keyword: true },
  { name: 'formations.institution', weight: 10, keyword: true },
  { name: 'experiences.position', weight: 15, keyword: true },
  {
    name: 'experiences.offices.current_position',
    weight: 15,
    keyword: true
  },
  { name: 'experiences.offices.name', weight: 15, keyword: true },
  { name: 'professional_title', weight: 20 },
  { name: 'professional_about', weight: 8 },
  { name: 'experiences.offices.description', weight: 8 },
  { name: 'city', weight: 12, keyword: true },
  { name: 'state', weight: 12 },
  { name: 'experiences.offices.location', weight: 12, keyword: true }
];

type ElasticSearchDTO = SearchDTO & {
  fields: string[];
  index: string;
  query_filters?: QueryDslBoolQuery;
};

type ElasticSearchProfileDTO = SearchDTO & {
  aditionalFilter?: string;
};

interface QueryProps {
  field: string;
  value: string;
}

@Injectable()
export class ElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  // Priorizar email e telefone primeiro
  // Realizar uma busca nos campos
  // nome , professional_title, city, state, tags

  parserElasticResult(
    elastic_result: SearchResponse<
      unknown,
      Record<string, AggregationsAggregate>
    >,
    page: number,
    records_per_page: number
  ) {
    const results = [];
    for (const profile of elastic_result.hits.hits) {
      const data = profile._source as Profile;
      results.push({ ...data, _score: profile._score });
    }
    const total_results = (elastic_result.hits.total as SearchTotalHits)?.value;

    return {
      page,
      results: results,
      total_results_per_page: records_per_page,
      total_results,
      total_pages: Math.ceil(Number(total_results) / records_per_page)
    };
  }

  async searchProfile({
    page = 1,
    records_per_page = 15,
    search = '',
    aditionalFilter = ''
  }: ElasticSearchProfileDTO): Promise<ListEntitiesModel<Profile>> {
    const searchParams: ElasticSearchProfileDTO = {
      page,
      records_per_page,
      search,
      aditionalFilter
    };
    let results = await this.searchProfileCoditional(searchParams, 'AND');
    if (results.total_results === 0) {
      results = await this.searchProfileCoditional(searchParams, 'OR');
    }
    return results;
  }

  async searchProfileCoditional(
    {
      page = 1,
      records_per_page = 15,
      search = '',
      aditionalFilter = ''
    }: ElasticSearchProfileDTO,
    conditional: string
  ): Promise<ListEntitiesModel<Profile>> {
    const skip = (page - 1) * records_per_page;
    const orignalSearchString = search;

    const words = getWordsCombination(orignalSearchString);

    const exactPhrase = '(' + search + ')^10';

    const likePhrase = '(*' + search + '*)^10';

    const exactSearchWithAND = '(' + words.join(' AND ') + ')^4';

    const exactSearchWithOR = '(' + words.join(' OR ') + ')^3';

    const likeSearchWithAND = '(*' + words.join('* AND *') + '*)^2';

    const likeSearchWithOR = '(*' + words.join('* OR *') + '*)^1';

    let finalSearchString = [
      exactPhrase,
      likePhrase,
      exactSearchWithAND,
      exactSearchWithOR,
      likeSearchWithAND,
      likeSearchWithOR
    ].join(` ${conditional} `);

    const sort: any = [
      {
        'email.keyword': {
          order: 'asc',
          missing: '_last'
        },
        'phone.keyword': {
          order: 'asc',
          missing: '_last'
        }
      },
      '_score'
    ];

    finalSearchString = '(' + finalSearchString + ')' + aditionalFilter;
    const fields = generateSearchFilter(PROFILE_QUERY_FIELDS);
    const queryString = {
      query_string: {
        query: finalSearchString,
        fields: fields
      }
    };

    const elastic_result = await this.elasticsearchService.search({
      index: 'profile',
      query: queryString,
      sort: sort,
      from: skip,
      size: records_per_page
    });

    return this.parserElasticResult(elastic_result, page, records_per_page);
  }

  async listAll({ index, page, records_per_page }: ElasticSearchDTO) {
    const skip = (page - 1) * records_per_page;
    const elastic_result = await this.elasticsearchService.search({
      index,
      from: skip ? skip : 0,
      size: records_per_page,
      query: {
        match_all: {}
      }
    });
    return this.parserElasticResult(elastic_result, page, records_per_page);
  }

  async search({
    page = 1,
    records_per_page = 15,
    search = '',
    fields,
    index,
    query_filters = { must: { match_all: {} } }
  }: ElasticSearchDTO): Promise<ListEntitiesModel<Profile>> {
    const searchFieldTrim = search?.trim();

    const skip = (page - 1) * records_per_page;
    let query: QueryDslQueryContainer = {
      bool: {
        must: {
          multi_match: {
            query: `${searchFieldTrim}`,
            operator: 'OR',
            fields
          }
        },
        ...query_filters
      }
    };

    let sort = [{ created_at: { order: 'desc' } } as any, '_score'];

    if (index === 'profile') {
      sort = [
        { 'email.keyword': { missing: '_last' } },
        { 'phone.keyword': { missing: '_last' } }
      ];
    }

    if (!searchFieldTrim) query = { bool: query_filters };
    const elastic_result = await this.elasticsearchService.search({
      index,
      from: skip,
      size: records_per_page,
      query,
      sort
    });

    return this.parserElasticResult(elastic_result, page, records_per_page);
  }

  generateOriginQuery(origins: string[]): QueryDslQueryContainer {
    if (!origins)
      return {
        match_all: {}
      };

    if (origins.length > 2) return { match_all: {} };

    if (origins.length === 1) {
      switch (origins[0]) {
        case 'Cadastro interno':
          return {
            bool: {
              must_not: [
                {
                  match: {
                    created_by: 'Portal de vagas'
                  }
                },
                {
                  match: {
                    created_by: 'Linkedin'
                  }
                }
              ]
            }
          };
        case 'Importação':
          return {
            match: {
              created_by: 'Linkedin'
            }
          };
        case 'Portal de vagas':
          return {
            match: {
              created_by: 'Portal de vagas'
            }
          };
        default:
          break;
      }
    }

    if (origins.length === 2) {
      if (
        origins.includes('Cadastro interno') &&
        origins.includes('Importação')
      ) {
        return {
          bool: {
            must_not: [
              {
                match: {
                  created_by: 'Portal de vagas'
                }
              }
            ]
          }
        };
      }

      if (
        origins.includes('Cadastro interno') &&
        origins.includes('Portal de vagas')
      ) {
        return {
          bool: {
            must_not: [
              {
                match: {
                  created_by: 'Linkedin'
                }
              }
            ]
          }
        };
      }

      return {
        bool: {
          must: {
            match: {
              created_by: '(Linkedin OR "Portal de vagas")'
            }
          }
        }
      };
    }

    return { match_all: {} };
  }

  generateDefaultQueryFilter(
    uds: string,
    impedido: string,
    open_to_work: string,
    origins: string[]
  ): QueryDslBoolQuery {
    const queries: QueryProps[] = [
      {
        field: 'impedido',
        value: impedido
      },
      {
        field: 'uds',
        value: uds
      }
    ];
    const fieldsToMatch: string[] = [];

    queries.forEach((value) => {
      if (value.value === 'true') {
        fieldsToMatch.push(value.field);
      }
    });

    if (fieldsToMatch.length > 1) {
      return {
        must: [
          {
            multi_match: {
              query: 'true',
              fields: fieldsToMatch
            }
          },
          this.generateOriginQuery(origins)
        ]
      };
    }

    if (uds === 'true') {
      return {
        must: [
          {
            match: {
              uds: true
            }
          },
          this.generateOriginQuery(origins)
        ]
      };
    }

    if (impedido === 'true') {
      return {
        must: [
          {
            match: {
              impedido: true
            }
          },
          this.generateOriginQuery(origins)
        ]
      };
    }

    if (!open_to_work || open_to_work === 'false') {
      return {
        must: [
          {
            match: {
              open_to_work: false
            }
          },
          this.generateOriginQuery(origins)
        ]
      };
    }

    if (origins) {
      return {
        must: [this.generateOriginQuery(origins)]
      };
    }

    return {
      must_not: [
        {
          multi_match: {
            query: 'true',
            fields: ['uds', 'impedido']
          }
        }
      ]
    };
  }

}
