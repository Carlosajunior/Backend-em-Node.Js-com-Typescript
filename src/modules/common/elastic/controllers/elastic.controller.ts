import { SearchDTO } from '@/modules/messages/dtos';
import { QueryDslBoolQuery } from '@elastic/elasticsearch/lib/api/types';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ElasticSearchIndex } from '../constants';
import { SearchProfilesDTO } from '../dtos/search-profiles.dto';
import { ElasticListProfessionals } from '../models/profile.model';
import { ElasticService } from '../services/elastic.service';
import { SearchProfileService } from '../services/search-profile.service';

@Controller('elastic')
@ApiTags('elastic')
export class ElasticController {
  constructor(
    private readonly elasticService: ElasticService,
    private readonly searchProfileService: SearchProfileService
  ) { }

  @Post('professional-profile/search')
  public async index(@Body() data: SearchProfilesDTO): Promise<ElasticListProfessionals> {
    try {
      return await this.searchProfileService.execute(data);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('vacancies')
  async search_vacancies(
    @Headers('groups') headers: Array<string>,
    @Query() { page, records_per_page, search }: SearchDTO,
    @Req() req
  ): Promise<any> {
    const query_filters: QueryDslBoolQuery = {
      must: {
        match: {
          username_id: req.user.id
        }
      }
    };
    return this.elasticService.search({
      page,
      records_per_page,
      search,
      fields: ['tags.name', 'identify', 'title', 'languages.language'],
      index: ElasticSearchIndex.vacancies,
      query_filters: headers.includes('Comercial') ? query_filters : undefined
    });
  }

  @Get('customers')
  async search_customers(
    @Query() { page, records_per_page, search }: SearchDTO
  ): Promise<any> {
    return this.elasticService.search({
      page,
      records_per_page,
      search,
      fields: ['name'],
      index: ElasticSearchIndex.customer
    });
  }

  @Get('funnel')
  async search_funnels(
    @Query() { page, records_per_page, search }: SearchDTO
  ): Promise<any> {
    return this.elasticService.search({
      page,
      records_per_page,
      search,
      fields: ['name'],
      index: ElasticSearchIndex.funnel
    });
  }

  @Get('templates')
  async search_templates(
    @Query() { page, records_per_page, search }: SearchDTO
  ): Promise<any> {
    return this.elasticService.search({
      page,
      records_per_page,
      search,
      fields: ['name'],
      index: ElasticSearchIndex.template
    });
  }
}
