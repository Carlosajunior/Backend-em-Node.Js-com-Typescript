import { Injectable } from '@nestjs/common';
import { SearchProfilesDTO } from '../dtos/search-profiles.dto';
import { ElasticListProfessionals } from '../models/profile.model';
import { ProfessionalProfileRepository } from '../repositories/professional-profile.repository';

@Injectable()
export class SearchProfileByTextService {
  public readonly professionalProfileRepository: ProfessionalProfileRepository;

  public constructor(
    professionalProfileRepository: ProfessionalProfileRepository
  ) {
    this.professionalProfileRepository = professionalProfileRepository;
  }

  public async execute(
    req: SearchProfilesDTO
  ): Promise<ElasticListProfessionals> {
    const searchFieldTrim = req?.search?.trim();

    if (searchFieldTrim && searchFieldTrim?.length < 2) {
      throw new Error('O termo de busca deve conter pelo menos 2 caracteres.');
    }

    return await this.professionalProfileRepository.findByText(req);
  }
}
