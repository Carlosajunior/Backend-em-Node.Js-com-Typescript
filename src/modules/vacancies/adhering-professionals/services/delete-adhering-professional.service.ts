import { Service } from '@/modules/common/shared/core/service';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IsInt } from 'class-validator';
import { getRepository } from 'typeorm';
import { DeleteAdheringProfessionalByProfileIdDTO } from '../dtos/delete-adhering-professional-by-profile-id.dto';

export class DeleteAdheringProfessionalRequest extends DeleteAdheringProfessionalByProfileIdDTO {
  @IsInt()
  vacancy_id: number;
}
@Injectable()
export class DeleteAdheringProfessionalService
  implements Service<DeleteAdheringProfessionalRequest, Observation>
{

  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  public async execute({
    profile_id,
    vacancy_id
  }: DeleteAdheringProfessionalRequest): Promise<Observation> {
    const observation = await getRepository(Observation).findOne({
      where: {
        profile_id,
        vacancy_id
      }
    });

    if (!observation) return;

    let profileObservations = await getRepository(Observation).find({
      where: {
        profile_id
      }
    });

    profileObservations = profileObservations?.filter(
      (obs) => obs.id !== observation.id
    );

    await this.elasticsearchService.update({
      index: 'profile',
      id: profile_id,
      retry_on_conflict: 1,
      doc: {
        observations: profileObservations || []
      }
    });

    await getRepository(Observation).remove(observation, { transaction: true });

    return { ...observation, vacancy_id: vacancy_id.toString() };
  }
}
