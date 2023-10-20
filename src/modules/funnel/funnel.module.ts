import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRepository } from '../audit/repositories';
import { ObservationsRepository } from '../professional-profiles/observations/repositories';
import { UserRepository } from '../users/repositories/user.repository';
import { VacancyRepository } from '../vacancies/repositories/vacancy.repository';
import { ColumnsRepository } from './columns/repositories';
import { FunnelVacanciesController } from './controllers/funnel-vacancies.controller';
import { FunnelController } from './controllers/funnel.controller';
import { FunnelService } from './services/funnel.service';
import { FunnelRepository } from './repositories/funnel.repository';
import { SearchFunnelVacanciesService } from './services/search-funnel-vacancies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditRepository,
      ColumnsRepository,
      FunnelRepository,
      ObservationsRepository,
      UserRepository,
      VacancyRepository
    ])
  ],
  controllers: [FunnelController, FunnelVacanciesController],
  providers: [FunnelService, SearchFunnelVacanciesService]
})
export class FunnelModule { }
