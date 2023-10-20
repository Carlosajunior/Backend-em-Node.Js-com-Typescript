import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { Injectable } from '@nestjs/common';
import { Service } from '../../shared/core/service';
import { ElasticListProfessionals } from '../models/profile.model';
import { ProfessionalProfileRepository } from '../repositories/professional-profile.repository';

@Injectable()
export class GetLastestProfilesService
  implements Service<SearchProfileDTO, ElasticListProfessionals>
{
  public constructor(
    private readonly professionalProfileRepository: ProfessionalProfileRepository
  ) {}
  public async execute(
    request: SearchProfileDTO
  ): Promise<ElasticListProfessionals> {
    return await this.professionalProfileRepository.findLastests(request);
  }
}
