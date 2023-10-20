import { EntityRepository, Repository } from 'typeorm';
import { VacancyLanguage } from './../entities/vacancy_languages.entity';

@EntityRepository(VacancyLanguage)
export class VacancyLanguageRepository extends Repository<VacancyLanguage> {}
