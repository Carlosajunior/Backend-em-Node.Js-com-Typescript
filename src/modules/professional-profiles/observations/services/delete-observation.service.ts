import { BadRequestException, Injectable } from '@nestjs/common';
import { ObservationsRepository } from '../repositories';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UpdateResponse } from '@elastic/elasticsearch/lib/api/types';
@Injectable()
export class DeleteObservationService {
  constructor(
    private readonly observationsRepository: ObservationsRepository,
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

  public async execute(id: string): Promise<UpdateResponse> {
    const observation = await this.observationsRepository.findOne(id);

    if (!observation) {
      throw new BadRequestException(
        'É necessário informar uma observação válida.'
      );
    }

    const removedObservation = await this.observationsRepository.remove(observation);
    if (removedObservation) {
      return await this.update_observations_into_elastic(removedObservation.profile_id)
    }
  }
}
