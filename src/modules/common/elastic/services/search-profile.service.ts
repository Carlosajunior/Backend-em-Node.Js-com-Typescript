import { Injectable } from '@nestjs/common';
import { TypeSearch } from '../../shared/constants/type-search.constant';

import { SearchProfilesDTO } from '../dtos/search-profiles.dto';
import { ElasticListProfessionals } from '../models/profile.model';
import { GetLastestProfilesService } from './get-lastest-profiles.service';
import { SearchProfileByParamsService } from './search-profile-by-params.service';
import { SearchProfileByTextService } from './search-profile-by-text.service';

@Injectable()
export class SearchProfileService {
  public constructor(
    private readonly getLastestProfiles: GetLastestProfilesService,
    private readonly searchByText: SearchProfileByTextService,
    private readonly searchByParams: SearchProfileByParamsService
  ) {}

  public async execute(
    req: SearchProfilesDTO
  ): Promise<ElasticListProfessionals> {
    switch (req.type_search) {
      case TypeSearch.MOST_RECENT: {
        return await this.getLastestProfiles.execute(req);
      }

      case TypeSearch.PARAMS: {
        return await this.searchByParams.execute(req);
      }

      case TypeSearch.SEARCH: {
        return await this.searchByText.execute(req);
      }

      default:
        return null;
    }
  }
}
