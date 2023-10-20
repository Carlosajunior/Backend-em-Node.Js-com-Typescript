import { elasticsearchConfig } from '@/config/elasticseach';
import { CategoriesRepository } from '@/modules/categories/repositories';
import { ProfessionalProfileRepository } from '@/modules/common/elastic/repositories/professional-profile.repository';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { AdheringProfessionalsController } from './controllers/adhering-professionals.controller';
import { DeleteAdheringProfessionalService } from './services/delete-adhering-professional.service';
import { ListAdheringProfessionalsByVacancyIdService } from './services/list-adhering-professionals-by-vacancy-id.service';

@Module({
  controllers: [AdheringProfessionalsController],
  imports: [
    ElasticsearchModule.register(elasticsearchConfig),
    TypeOrmModule.forFeature([CategoriesRepository, VacancyRepository])
  ],
  providers: [
    DeleteAdheringProfessionalService,
    ListAdheringProfessionalsByVacancyIdService,
    ProfessionalProfileRepository
  ]
})
export class AdheringProfessionalsModule {}
