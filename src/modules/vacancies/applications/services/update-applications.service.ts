import { RequestContext } from '@/modules/common/auth/middlewares';
import { User } from '@/modules/users/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyOptions, getRepository, IsNull, Not } from 'typeorm';
import { UpdateDTO } from '../controllers/update-applications.controller';
import { UpdateApplicationsRepository } from '../repositories/update-applications.repository';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class UpdateApplicationsService {
  constructor(
    private readonly updateApplicationsRepository: UpdateApplicationsRepository,
    private readonly observationsRepository: ObservationsRepository,
    private readonly elasticsearchService: ElasticsearchService
  ) { }

  already = []
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

  public async *processDbData(
    options?: FindManyOptions<Observation>,
    page?: number
  ) {
    const [observations, count] = await this.observationsRepository.findAndCount(
      options
    );
    yield {
      total: count,
      total_pages: Math.ceil(count / Number(options.take)),
      page: page
    };

    try {
      for (const observation of observations) {
        if (!this.already.includes(observation.profile_id)) {
          this.already.push(observation.profile_id)
          console.log(`Updating - ${observation.profile_id}`)
          await this.update_observations_into_elastic(observation.profile_id)
          yield observation;
        }
      }
    } catch (error) {
      console.log(`Error  - ${error.message}`)
    }
  }

  async updateAllVacancyAdheringProfiles({ page = 1, records_per_page = 10 }, id) {
    const response = [];
    /**
     * Todos os candidatos que estão em alguma vaga
     */
    for await (const data of this.processDbData({
      select: ['profile_id'],
      where: {
        vacancy_id: id || Not(IsNull())
      },
      take: Number(records_per_page),
      skip: (Number(page) - 1) * Number(records_per_page),
    })) {
      response.push(data);
    }
    console.log(response)
    if (response[0].total_pages > Number(page)) {
      await this.updateAllVacancyAdheringProfiles({
        page: Number(page) + 1,
        records_per_page
      }, id);
    }
    return response[0];
  }

  async update(id: string, data: UpdateDTO) {
    const { email } = RequestContext.currentUser();

    if (Object.keys(data).includes('linked_by')) {
      const user = await getRepository(User).findOne({
        where: {
          email
        }
      });

      if (!user) throw new BadRequestException('User not found');

      data.recruiter_id = user.id;
    }

    const application = await this.updateApplicationsRepository.updateStage(
      id,
      data
    );

    if (application) {
      await this.update_observations_into_elastic(application.profile_id)
    }
    return application;
  }
}
