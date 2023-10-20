import { Service } from '@/modules/common/shared/core/service';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IsInt, IsNotEmpty, isUUID } from 'class-validator';
import { UpdateColumnIdDTO } from '../dtos/update-column-id.dto';
import { VacancyRepository } from '../repositories/vacancy.repository';
import { ColumnsRepository } from './../../funnel/columns/repositories/columns.repository';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { UpdateResponse } from '@elastic/elasticsearch/lib/api/types';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export class MoveVacancyCandidateDTO extends UpdateColumnIdDTO {
  @IsInt()
  @IsNotEmpty()
  vacancy_id: number;
}

@Injectable()
export class MoveVacancyCandidateService
  implements Service<MoveVacancyCandidateDTO, UpdateResponse<unknown>>
{
  public constructor(
    private readonly columnRepository: ColumnsRepository,
    private readonly observationRepository: ObservationsRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly elasticsearchService: ElasticsearchService
  ) { }


  public async execute({
    old_observation_id,
    observation_id,
    vacancy_id
  }: MoveVacancyCandidateDTO): Promise<UpdateResponse<unknown>> {
    if (old_observation_id) {
      if (!isUUID(old_observation_id)) {
        throw new BadRequestException('Vaga inválida');
      }

      await this.observationRepository.update(
        { id: old_observation_id },
        { column_id: null }
      );
    }

    const vacancy = await this.vacancyRepository.findOne({
      where: {
        id: vacancy_id
      }
    });

    if (!vacancy) {
      throw new BadRequestException('Vaga inválida');
    }

    if (!vacancy?.funnel_id) {
      throw new BadRequestException('Não há funil para a vaga selecionada.');
    }

    const vacancyFunnelFirstColumn = await this.columnRepository.findOne({
      order: {
        index: 'ASC'
      },
      where: {
        funnelId: vacancy.funnel_id
      }
    });

    if (!vacancyFunnelFirstColumn) {
      throw new BadRequestException('Não há coluna para a vaga selecionada.');
    }

    const updated = await this.observationRepository.update(
      { id: observation_id },
      { column_id: vacancyFunnelFirstColumn.id }
    );

    if (updated.affected === 1) {
      const observation = await this.observationRepository.findOne({ where: { id: observation_id }, select: ['profile_id'] })
      const observations = await this.observationRepository.listObservationsByProfile(observation.profile_id);
      return await this.elasticsearchService.update({
        index: ElasticSearchIndex.profile,
        id: observation.profile_id,
        retry_on_conflict: 1,
        doc: {
          observations
        }
      });
    }
  }
}
