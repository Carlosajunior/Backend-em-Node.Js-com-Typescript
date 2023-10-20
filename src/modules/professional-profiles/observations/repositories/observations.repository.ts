import { EntityRepository, IsNull, Not, Repository } from 'typeorm';

import {
  CreateObservationDTO,
  UpdateObservationDTO
} from '@/modules/professional-profiles/observations/dtos';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import {
  ObservationDTO,
  ObservationMapper
} from '../mappers/ObservationMapper';

@EntityRepository(Observation)
export class ObservationsRepository extends Repository<Observation> {
  async createObservationsInBulk(
    data: CreateObservationDTO[]
  ): Promise<Observation[]> {
    const promises = data.map(async (observation) => {
      const createdObservation = this.create(observation);
      return await this.save(createdObservation);
    });
    const observations = Promise.all(promises);
    return observations;
  }

  public async existsByProfileIdAndVacancyId(
    profile_id: string,
    vacancy_id: number
  ): Promise<boolean> {
    const observation = await this.findOne({
      where: { profile_id, vacancy_id }
    });
    return !!observation;
  }

  async findObservationsByProfileIdS(
    profile_ids: string[],
    vacancy_id: number
  ): Promise<Observation[]> {
    const promises = profile_ids.map(async (profile_id) => {
      return await this.findOne({
        where: { profile_id, vacancy_id }
      });
    });

    const getObservations = await Promise.all(promises);
    return getObservations.filter((obs) => Boolean(obs));
  }

  public async listObservationsByProfile(
    profile_id: string
  ): Promise<ObservationDTO[]> {
    const observationFromBD = await this.find({
      where: { profile_id },
      order: {
        created_at: 'ASC'
      },
      relations: ['vacancy']
    });

    return observationFromBD?.map((obs) => ObservationMapper.toDTO(obs));
  }

  async countObservationsBColumnId(column_id): Promise<number> {
    const total = await this.count({ where: { column_id } });
    return total;
  }

  async insertOrDeleteObservationsInBulk(
    data: UpdateObservationDTO[],
    profile_id: string,
    vacancy_id?: number
  ): Promise<Observation[]> {
    const profileObservations = vacancy_id
      ? await this.find({ where: { vacancy_id } })
      : await this.find({ where: { profile_id } });
    const divergents = profileObservations.filter((profileObservation) =>
      !data.some((Observation) => Observation.id === profileObservation.id)
    );
    await this.remove(data.length > 0 ? divergents : profileObservations);
    const observations = vacancy_id
      ? await this.save(
          data.map((data) => ({ ...data, vacancy_id: String(vacancy_id) }))
        )
      : await this.save(data.map((data) => ({ ...data, profile_id })));
    return observations;
  }

  async insertObservation(
    data: UpdateObservationDTO,
    profile_id: string,
    vacancy_id?: number
  ): Promise<Observation> {
    const observation = vacancy_id
      ? await this.save({ ...data, vacancy_id: String(vacancy_id) })
      : await this.save({ ...data, profile_id });
    return observation;
  }

  async deleteObservation(observation: Observation): Promise<void> {
    await this.remove(observation);
  }

  async countCandidatesOnColumn(column_id: string, vacancy_id: number) {
    return await this.count({
      where: {
        vacancy_id: vacancy_id,
        column_id: column_id,
        profile_id: Not(IsNull())
      }
    });
  }
}