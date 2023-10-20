import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Groups } from '../../common/auth/decorators/groups.decorator';
import { AccessProfiles } from '../../common/shared/constants/access-profiles';
import { SearchFunnelVacanciesDTO } from '../dto/list-vacancies-by-funnel-id.dto';
import { SearchFunnelVacanciesService } from '../services/search-funnel-vacancies.service';

@Controller('funnels')
@ApiTags('funnels')
export class FunnelVacanciesController {
  public constructor(private readonly searchFunnelVacancies: SearchFunnelVacanciesService) { }

  @Get('vacancies/:funnel_id')
  @Groups(
    AccessProfiles.ADMINISTRATIVE,
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async index(@Query() query: SearchFunnelVacanciesDTO, @Param('funnel_id') funnel_id: string) {
    try {
      return await this.searchFunnelVacancies.execute({ ...query, funnel_id });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
