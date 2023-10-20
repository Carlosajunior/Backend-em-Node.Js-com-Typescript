import { Service } from '@/modules/common/shared/core/service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Vacancy } from '../entities/vacancy.entity';
import { VacancyRepository } from '../repositories/vacancy.repository';

@Injectable()
export class ShowVacancyService implements Service<number, Vacancy> {
  public constructor(private readonly vacancyRepository: VacancyRepository) { }

  public async execute(id: number): Promise<Vacancy> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('Vaga não encontrada.');
      }

      const vacancy = await this.vacancyRepository.findOne({
        where: {
          id
        },
        relations: [
          'category',
          'commercial',
          'contact',
          'customer',
          'customer.logo',
          'customer.contacts',
          'funnel',
          'recruiter',
          'tags',
          'vacancy_languages',
          'vacancy_languages.language'
        ]
      });

      if (!vacancy) {
        throw new BadRequestException('Vaga não encontrada.');
      }

      return vacancy;
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
