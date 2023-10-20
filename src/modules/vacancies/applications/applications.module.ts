import { elasticsearchConfig } from '@/config/elasticseach';
import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { FilterApplicationsController } from './controllers/filter-applications.controller';
import { GetApplicationsByVacancyIdController } from './controllers/get-applications-by-vacancy-id.controller';
import { UpdateApplicationsController } from './controllers/update-applications.controller';
import { ApplicationsRepository } from './repositories';
import { UpdateApplicationsRepository } from './repositories/update-applications.repository';
import {
  FilterApplicationsService,
  GetApplicationsByVacancyIdService
} from './services';
import { UpdateApplicationsService } from './services/update-applications.service';

@Module({
  imports: [
    ElasticsearchModule.register(elasticsearchConfig),
    TypeOrmModule.forFeature([
      ApplicationsRepository,
      UpdateApplicationsRepository,
      ObservationsRepository,
      Vacancy
    ])
  ],
  controllers: [
    GetApplicationsByVacancyIdController,
    FilterApplicationsController,
    UpdateApplicationsController
  ],
  providers: [
    DecodeTokenService,
    FilterApplicationsService,
    GetApplicationsByVacancyIdService,
    UpdateApplicationsService
  ]
})
export class ListingModule { }
