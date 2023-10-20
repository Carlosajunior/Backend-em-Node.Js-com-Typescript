import { EntityRepository, Repository } from 'typeorm';

import {
  CreateExperienceDTO,
  UpdateExperienceDTO
} from '@/modules/professional-profiles/experiences/dtos';
import { Experience } from '@/modules/professional-profiles/experiences/entities';

@EntityRepository(Experience)
export class ExperiencesRepository extends Repository<Experience> {
  async createExperiencesInBulk(
    data: CreateExperienceDTO[]
  ): Promise<Experience[]> {
    const promises = data.map(async (experience) => {
      const createdExperience = this.create(experience);
      return await this.save(createdExperience);
    });
    const experiences = Promise.all(promises);
    return experiences;
  }

  async listExperiencesByProfile(profile_id: string) {
    return await this.find({
      select: [
        'id',
        'company',
        'current_position',
        'description',
        'position',
        'profile_id',
        'initial_date',
        'end_date'
      ],
      relations: ['offices'],
      where: { profile_id }
    });
  }

  async insertOrDeleteExperiencesInBulk(
    data: UpdateExperienceDTO[],
    profile_id: string
  ): Promise<Experience[]> {
    const profileExperiences = await this.find({
      where: { profile_id },
      relations: ['offices']
    });
    const divergents = profileExperiences.filter((profileExperience) =>
      data.some((experience) => experience.id !== profileExperience.id)
    );
    await this.remove(data.length > 0 ? divergents : profileExperiences);
    const experiences = await this.save(
      data.map((data) => ({ ...data, profile_id }))
    );
    return experiences;
  }
}
