import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfilesRepository } from '../../profiles/repositories';
import { Observation } from '../entities';
import { ObservationsRepository } from '../repositories';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export interface Request {
  note: string;
  profile_id: string;
  vacancy_id?: number;
  user: string;
}

@Injectable()
export class CreateObservationService {
  constructor(
    private readonly observationsRepository: ObservationsRepository,
    private readonly professionalProfileRepository: ProfilesRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly elasticsearchService: ElasticsearchService
  ) { }

  async update_observations_into_elastic(id: string) {
    const observations = await this.observationsRepository.listObservationsByProfile(id);
    return await this.elasticsearchService.update({
      index: ElasticSearchIndex.profile,
      id,
      retry_on_conflict: 1,
      doc: {
        observations
      }
    });
  }

  public async execute(request: Request): Promise<Observation> {
    let vacancy: Vacancy = null;
    let vacancy_id_formatted: string = null;

    if (request.note.length > 300) {
      throw new BadRequestException(
        'A observação deve ter no máximo 300 caracteres.'
      );
    }

    if (request?.vacancy_id) {
      const alreadyExists =
        await this.observationsRepository.existsByProfileIdAndVacancyId(
          request.profile_id,
          request.vacancy_id
        );
      if (alreadyExists) {
        throw new BadRequestException(
          'Este profissional já foi vinculado a esta vaga.'
        );
      }

      vacancy = await this.vacancyRepository.findOne({
        id: request.vacancy_id
      });

      if (!vacancy) {
        throw new BadRequestException('É necessário informar uma vaga válida.');
      }

      if (vacancy.status.toLowerCase() !== 'aberto') {
        throw new BadRequestException('É necessário informar uma vaga válida.');
      }

      vacancy_id_formatted = String(vacancy.id);
    }

    const professional = await this.professionalProfileRepository.findOne({
      id: request.profile_id
    });

    if (!professional) {
      throw new BadRequestException(
        'É necessário informar um profissional válido.'
      );
    }

    try {
      const observation = this.observationsRepository.create({
        contact_date: new Date(),
        linked_by: request.user,
        note: request.note,
        profile_id: professional.id,
        vacancy_id: vacancy_id_formatted,
        identify: vacancy?.identify,
        status: vacancy?.status
      });
      const createdObservation = await this.observationsRepository.save(observation);
      if (createdObservation) {
        await this.update_observations_into_elastic(professional.id)
      }
      return createdObservation
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
