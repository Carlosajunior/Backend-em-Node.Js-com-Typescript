import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { ProfilesRepository } from '../profiles/repositories';
import { ObservationController } from './controllers';
import { ObservationService } from './services';
import { CreateObservationService } from './services/create-observation.service';
import { DeleteObservationService } from './services/delete-observation.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { elasticsearchConfig } from '@/config/elasticseach';

@Module({
  imports: [
    ElasticsearchModule.register(elasticsearchConfig),
    TypeOrmModule.forFeature([
      ObservationsRepository,
      ProfilesRepository,
      VacancyRepository
    ])
  ],
  controllers: [ObservationController],
  providers: [
    CreateObservationService,
    DeleteObservationService,
    ObservationService
  ]
})
export class ObservationsModule { }
