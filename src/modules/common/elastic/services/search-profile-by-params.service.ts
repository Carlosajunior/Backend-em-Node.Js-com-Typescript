import { Injectable } from '@nestjs/common';
import { SearchProfilesDTO } from '../dtos/search-profiles.dto';
import { ElasticListProfessionals } from '../models/profile.model';
import { SearchProfileByParams } from '../models/search-profile-by-params.model';
import { ProfessionalProfileRepository } from '../repositories/professional-profile.repository';

@Injectable()
export class SearchProfileByParamsService {
  public readonly professionalProfileRepository: ProfessionalProfileRepository;

  public constructor(
    professionalProfileRepository: ProfessionalProfileRepository
  ) {
    this.professionalProfileRepository = professionalProfileRepository;
  }

  public async execute(
    req: SearchProfilesDTO
  ): Promise<ElasticListProfessionals> {
    const searchProfileByParams = SearchProfileByParams.create(req);

    if (searchProfileByParams.isEmpty()) {
      return await this.professionalProfileRepository.find(req);
    }

    return await this.professionalProfileRepository.findByParams(req);
  }
}
