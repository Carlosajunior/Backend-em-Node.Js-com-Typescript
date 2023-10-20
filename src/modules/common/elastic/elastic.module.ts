import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticController } from './controllers/elastic.controller';
import { ElasticService } from './services/elastic.service';

import { elasticsearchConfig } from '@/config/elasticseach';
import { SearchProfileByTextService } from './services/search-profile-by-text.service';
import { SearchProfileService } from './services/search-profile.service';

import { CategoriesRepository } from '@/modules/categories/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalProfileRepository } from './repositories/professional-profile.repository';
import { GetLastestProfilesService } from './services/get-lastest-profiles.service';
import { SearchProfileByParamsService } from './services/search-profile-by-params.service';
@Module({
  imports: [
    ElasticsearchModule.register(elasticsearchConfig),
    TypeOrmModule.forFeature([CategoriesRepository])
  ],
  controllers: [ElasticController],
  providers: [
    ElasticService,
    GetLastestProfilesService,
    ProfessionalProfileRepository,
    SearchProfileByParamsService,
    SearchProfileByTextService,
    SearchProfileService
  ]
})
export class ElasticModule {}
