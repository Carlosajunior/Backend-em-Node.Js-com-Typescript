import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecodeTokenService } from '../common/auth/services/decode-token.service';
import { TagsRepository } from '../common/tags/repositories';
import { ColumnsRepository } from '../funnel/columns/repositories';
import { ObservationsRepository } from '../professional-profiles/observations/repositories';
import { UserRepository } from '../users/repositories/user.repository';
import { MoveVacancyCandidateController } from './controllers/move-vacancy-candidate.controller';
import { AdheringProfessionalsModule } from './adhering-professionals/adhering-professionals.module';
import { ReplicateVacancyController } from './controllers/replicate-vacancy.controller';
import { UpdateStatusVacancyController } from './controllers/update-status.controller';
import { VacancyController } from './controllers/vacancy.controller';
import { VacancyLanguage } from './entities/vacancy_languages.entity';
import { NotesModule } from './notes/notes.module';
import { ExtractTagsJob } from './queues/jobs/extract-tags.job';
import { UpdateVacancyLanguagesJob } from './queues/jobs/update-vacancy-languages.job';
import { VacancyRepository } from './repositories/vacancy.repository';
import { VacancyLanguageRepository } from './repositories/vacancy_languages.repository';
import { CreateVacancyService } from './services/create-vacancy.service';
import { GenerateVacancyIdentifierService } from './services/generate-vacancy-identifier.service';
import { ListVacanciesService } from './services/list-vacancies.service';
import { MoveVacancyCandidateService } from './services/move-vacancy-candidate.service';
import { ReplicateVacancyService } from './services/replicate-vacancy.service';
import { ShowVacancyService } from './services/show-vacancy.service';
import { UpdateVacancyStatusService } from './services/update-vacancy-status.service';
import { UpdateVacancyService } from './services/update-vacancy.service';
import { ListAdheringProfessionalsByVacancyIdService } from './adhering-professionals/services/list-adhering-professionals-by-vacancy-id.service';
import { ProfessionalProfileRepository } from '../common/elastic/repositories/professional-profile.repository';
import { CategoriesRepository } from '../categories/repositories';
import { elasticsearchConfig } from '@/config/elasticseach';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { UpdateAdheringProfessionalsOnVacancyService } from './services/update-adhering-professional-vacancy.service';

@Module({
  imports: [
    ElasticsearchModule.register(elasticsearchConfig),
    TypeOrmModule.forFeature([
      ColumnsRepository,
      ObservationsRepository,
      TagsRepository,
      UserRepository,
      VacancyLanguage,
      VacancyLanguageRepository,
      VacancyRepository,
      CategoriesRepository
    ]),
    AdheringProfessionalsModule,
    NotesModule
  ],
  controllers: [
    MoveVacancyCandidateController,
    ReplicateVacancyController,
    VacancyController,
    UpdateStatusVacancyController,
  ],
  providers: [
    CreateVacancyService,
    DecodeTokenService,
    ExtractTagsJob,
    GenerateVacancyIdentifierService,
    ListVacanciesService,
    MoveVacancyCandidateService,
    ReplicateVacancyService,
    ShowVacancyService,
    UpdateVacancyLanguagesJob,
    UpdateVacancyService,
    UpdateVacancyStatusService,
    ListAdheringProfessionalsByVacancyIdService,
    ProfessionalProfileRepository,
    UpdateAdheringProfessionalsOnVacancyService
  ]
})
export class VacancyModule { }
