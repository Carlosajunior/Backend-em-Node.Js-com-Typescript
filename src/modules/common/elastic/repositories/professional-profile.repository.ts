/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Categories } from '@/modules/categories/entities';
import { CategoriesRepository } from '@/modules/categories/repositories';
import { SearchDTO } from '@/modules/messages/dtos';
import { BooleanStatus } from '@/modules/professional-profiles/profiles/contansts';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { ListAdheringProfessionalsWithVacancyTagsDTO } from '@/modules/vacancies/adhering-professionals/dtos/list-adhering-professionals.dto';
import {
  QueryDslQueryContainer,
  SearchTotalHits,
  Sort
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { addDays, subDays } from 'date-fns';
import { DateHelper } from '../../helpers';
import { ListEntitiesModel } from '../../shared/models';
import { Conditional } from '../constants/conditionals.constants';
import {
  generateSearchFilter,
  getWordsCombination
} from '../constants/functions';
import { SearchProfilesDTO } from '../dtos/search-profiles.dto';
import { ProfessionalQuery } from '../helpers/professional-query';
import {
  ElasticListProfessionals,
  ElasticProfessionalProfile
} from '../models/profile.model';
import { SearchFields } from '../services/elastic.service';

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
  // { name: 'city', weight: 12, keyword: true },
  { name: 'state', weight: 12 },
  { name: 'experiences.offices.location', weight: 12, keyword: true }
];

@Injectable()
export class ProfessionalProfileRepository {
  constructor(
    private readonly elasticSearchService: ElasticsearchService,
    public readonly categoryRepository: CategoriesRepository
  ) { }

  public async find({
    page = 1,
    records_per_page = 15
  }: SearchDTO): Promise<ElasticListProfessionals> {
    const skip = (page - 1) * records_per_page;

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

    const query = {
      bool: {
        must: [{ match: { "active": true } }],
        must_not: []
      }
    };

    const elastic_result = await this.elasticSearchService.search({
      index: 'profile',
      query,
      sort,
      from: skip,
      size: records_per_page,
      fields: [
        'name',
        'city^0.5',
        'state',
        'professional_title',
        'tags.tag.name'
      ]
    });

    const results: ElasticProfessionalProfile[] = [];
    for (const profile of elastic_result.hits.hits) {
      const data = profile._source as Profile;
      results.push({
        ...data,
        _score: profile._score,
        is_new: data?.created_at
          ? DateHelper.diff(data?.created_at, new Date()) <= 7
          : false
      });
    }
    const total_results =
      (elastic_result.hits.total as SearchTotalHits)?.value || 0;

    return {
      page: Number(page),
      results,
      total_results_per_page: Number(records_per_page),
      total_results,
      total_pages: Math.ceil(Number(total_results) / records_per_page)
    };
  }

  public async findByParams(
    data: SearchProfilesDTO
  ): Promise<ElasticListProfessionals> {
    const skip = (data.page - 1) * data.records_per_page;
    let categories: Categories[];

    if (data?.categories) categories = await this.categoryRepository.find();

    const categoriesFiltered = categories?.filter((c) =>
      (data.categories as string[]).includes(c.category)
    );

    const query = {
      bool: {
        must: [],
        must_not: []
      }
    };

    query.bool.must.push({
      match: {
        "active": true
      }
    })

    const string_query = ProfessionalQuery.getQuery(data).query
    const fields_array = ProfessionalQuery.getQuery(data).fields
    if (string_query != '') {
      query.bool.must.push({
        query_string: {
          query: string_query,
          fields: fields_array
        }
      })
    }

    if (data.city) {
      query.bool.must.push({
        match: {
          "city.keyword": data.city
        }
      }),
        fields_array.push("city")
    }

    if (data.contacted) {
      if (data?.contacted === BooleanStatus.False) {
        query.bool.must_not.push({
          exists: {
            field: 'last_message.profile.id'
          }
        })
      }
      else if (data?.contacted === BooleanStatus.True) {
        query.bool.must.push({
          exists: {
            field: 'last_message.profile.id'
          }
        })
      }
    }

    if (data.email) {
      query.bool.must.push({
        match_phrase_prefix: {
          email: data.email
        }
      })
    }

    if (data.phone) {
      query.bool.must.push({
        match_phrase_prefix: {
          phone: data.phone
        }
      })
    }

    if (data.professional_title) {
      query.bool.must.push({
        match_phrase_prefix: {
          professional_title: data.professional_title
        }
      })
    }

    if (data.tags) {
      query.bool.must.push({
        terms: {
          'tags.tag.name.keyword': data.tags || []
        }
      })
    }

    if (data.languages) {
      query.bool.must.push({
        terms: {
          'languages.language.keyword':
            data.languages.map((language) =>
              language.split(' - ')[0].trim()
            ) || []
        }
      })


      query.bool.must.push({
        terms: {
          'languages.level.keyword':
            data.languages.map((language) =>
              language.split(' - ')[1].trim()
            ) || []
        }
      })
    }

    if (categoriesFiltered) {
      query.bool.must.push({
        terms: {
          category_id: categoriesFiltered?.map((cat) => cat.id) || []
        }
      })
    }

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
    const elastic_result = await this.elasticSearchService.search({
      index: 'profile',
      query,
      sort,
      from: skip,
      size: data.records_per_page,
      fields: [
        'name',
        'city^0.5',
        'state',
        'professional_title',
        'tags.tag.name'
      ]
    });

    const results: ElasticProfessionalProfile[] = [];
    for (const profile of elastic_result.hits.hits) {
      const data = profile._source as Profile;
      results.push({
        ...data,
        _score: profile._score,
        is_new: data?.created_at
          ? DateHelper.diff(data?.created_at, new Date()) <= 7
          : false
      });
    }
    const total_results =
      (elastic_result.hits.total as SearchTotalHits)?.value || 0;

    return {
      page: Number(data.page),
      results,
      total_results_per_page: Number(data.records_per_page),
      total_results,
      total_pages: Math.ceil(Number(total_results) / data.records_per_page)
    };
  }

  private async findWithConditional(
    query: SearchDTO,
    conditional: Conditional
  ): Promise<ElasticListProfessionals> {
    const skip = (query.page - 1) * query.records_per_page;
    const searchStringWithoutQuotationMarks = query?.search
      ?.replace(/"([^"]*)"/g, '')
      ?.trim();

    // cities
    const searchStringWithQuotationMarks = query?.search
      ?.match(/"([^"]*)"/g)
      ?.map((v) => v?.replace(/"*/g, '')?.trim())
      ?.join(' 0R ')
      ?.trim();

    if (!query?.search) {
      return await this.find(query);
    }

    if (!searchStringWithoutQuotationMarks && !searchStringWithQuotationMarks) {
      return await this.find(query);
    }

    const words: string[] = getWordsCombination(
      searchStringWithoutQuotationMarks
    );

    const exactPhrase = '(' + searchStringWithoutQuotationMarks + ')^10';

    const likePhrase = '(*' + searchStringWithoutQuotationMarks + '*)^10';

    const exactSearchWithAND = '(' + words.join(' AND ') + ')^4';

    const exactSearchWithOR = '(' + words.join(' OR ') + ')^3';

    const likeSearchWithAND = '(*' + words.join('* AND *') + '*)^2';

    const likeSearchWithOR = '(*' + words.join('* OR *') + '*)^1';

    const finalSearchString =
      '(' +
      [
        exactPhrase,
        likePhrase,
        exactSearchWithAND,
        exactSearchWithOR,
        likeSearchWithAND,
        likeSearchWithOR
      ].join(` ${conditional} `) +
      ')';

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

    const fields = generateSearchFilter(PROFILE_QUERY_FIELDS);

    const queryDSL: QueryDslQueryContainer = {
      bool: {
        must: [
          {
            match:
            {
              "active": true
            }
          }
        ]
      }
    };


    if (searchStringWithoutQuotationMarks) {
      queryDSL.bool.must = [
        {
          query_string: {
            query: finalSearchString,
            fields
          }
        }
      ];
    }

    if (searchStringWithQuotationMarks) {
      queryDSL.bool.must = [
        ...(queryDSL.bool.must as any[]),
        {
          query_string: {
            query: `city: ${searchStringWithQuotationMarks}`
          }
        }
      ];
    }

    const elastic_result = await this.elasticSearchService.search({
      index: 'profile',
      query: queryDSL,
      sort,
      from: skip,
      size: query.records_per_page
    });

    const results: ElasticProfessionalProfile[] = [];
    for (const profile of elastic_result.hits.hits) {
      const data = profile._source as Profile;
      results.push({
        ...data,
        _score: profile._score,
        is_new: data?.created_at
          ? DateHelper.diff(data?.created_at, new Date()) <= 7
          : false
      });
    }
    const total_results =
      (elastic_result.hits.total as SearchTotalHits)?.value || 0;

    return {
      page: Number(query.page),
      results,
      total_results_per_page: Number(query.records_per_page),
      total_results,
      total_pages: Math.ceil(Number(total_results) / query.records_per_page)
    };
  }

  public async findByText(query: SearchDTO): Promise<ElasticListProfessionals> {
    const params: SearchDTO = {
      page: query?.page ? Math.floor(query.page) : 1,
      records_per_page: query?.records_per_page
        ? Math.floor(query.records_per_page)
        : 15,
      search: query?.search || ''
    };

    let res = await this.findWithConditional(params, Conditional.AND);

    if (res.total_results === 0) {
      res = await this.findWithConditional(params, Conditional.OR);
    }

    return res;
  }

  public async findLastests({
    page = 1,
    records_per_page = 15
  }: SearchProfileDTO): Promise<ElasticListProfessionals> {
    const from = (page - 1) * records_per_page;
    let size = records_per_page;
    const today = new Date();

    const sevenDaysBefore = subDays(today, 7);
    const tomorrow = addDays(today, 1);

    const sort: any = [
      {
        created_at: {
          order: 'desc',
          missing: '_last'
        }
      },
      '_score'
    ];

    if (page * records_per_page > 50) {
      size = 50 - from;
    }

    if (records_per_page > 50) {
      size = Number(page) === 1 ? 50 : 0;
    }

    if (size < 0) {
      size = 0;
    }

    const query = {
      bool: {
        must: [{ match: { "active": true } }],
        must_not: []
      }
    };

    const elastic_result = await this.elasticSearchService.search({
      index: 'profile',
      query,
      sort,
      from,
      size
    });

    const results: ElasticProfessionalProfile[] = [];
    for (const profile of elastic_result.hits.hits) {
      const data = profile._source as Profile;
      results.push({
        ...data,
        _score: profile._score,
        is_new: data?.created_at
          ? DateHelper.diff(data?.created_at, new Date()) <= 7
          : false
      });
    }
    const total_results =
      (await this.elasticSearchService
        .count({
          index: 'profile'
        })
        .then((res) => res.count)) || 0;

    const total_of_imports_last_week = await this.elasticSearchService
      .count({
        index: 'profile',
        query: {
          query_string: {
            query: `created_at:[${sevenDaysBefore.toISOString()} TO ${tomorrow.toISOString()}]`
          }
        }
      })
      .then((res) => res.count);

    return {
      page: Number(page),
      total_pages: Math.ceil(
        (total_results > 50 ? 50 : total_results) / records_per_page
      ),
      total_results_per_page: Number(records_per_page),
      results,
      total_count: total_results,
      total_results: total_results > 50 ? 50 : total_results,
      total_of_imports_last_week
    };
  }

  public async findAdheringProfessionalsByVacancyId({
    page = 1,
    records_per_page = 15,
    ...query
  }: ListAdheringProfessionalsWithVacancyTagsDTO)/** : Promise<
    ListEntitiesModel<ElasticProfessionalProfile>
  > */ {
    const from = (page - 1) * records_per_page;
    const size = records_per_page;


    const queryDSL: QueryDslQueryContainer = {
      bool: {
        must: [
          {
            match: {
              'observations.vacancy_id': query.vacancy_id
            }
          }
        ],
        must_not: {
          exists: {
            field: 'observations.column_id'
          }
        }
      }
    };

    const sort: Sort = [
      {
        // _script: {
        //   script: `

        //   int common_tags_qtd = 0;
        //   int vacancy_tags_qtd = ${query.tags.length};

        //   return (common_tags_qtd / vacancy_tags_qtd) * 100;
        //   `,
        //   order: 'asc',
        //   type: 'number'
        // },
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

    const elastic_result = await this.elasticSearchService.search({
      index: 'profile',
      query: queryDSL,
      sort,
      size: 10000
    });

    const results: ElasticProfessionalProfile[] = [];
    for (const profile of elastic_result.hits.hits) {
      const data = profile._source as Profile;
      let tags_of_professionals_in_vacancy = 0;
      data?.tags?.forEach((profile_tag) => {
        if (
          query?.tags?.find(
            (vacancy_tag) => vacancy_tag.id === profile_tag.tag_id
          )
        ) {
          tags_of_professionals_in_vacancy++;
        }
      });

      const adhesion = Math.round(
        (tags_of_professionals_in_vacancy / query.tags.length) * 100
      );
      
      results.push({
        ...data,
        adhesion: adhesion > 100 ? 100 : adhesion,
        _score: profile._score,
        is_new: data?.created_at
          ? DateHelper.diff(data?.created_at, new Date()) <= 7
          : false
      });
    }
    results.sort((x, y) => { return y.adhesion - x.adhesion })
    return {
      results
    };
  }

}
