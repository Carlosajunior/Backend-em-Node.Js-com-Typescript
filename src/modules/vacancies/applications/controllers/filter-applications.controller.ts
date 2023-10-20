import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Body, Controller, Get, Headers, HttpStatus, NotAcceptableException, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilterApplicationsDTO } from '../dtos/filter-applications.dto';
import { FilterApplicationsService } from '../services';

@Controller('applications')
@ApiTags('funnel applications')
export class FilterApplicationsController {
  constructor(private readonly filterApplicationsService: FilterApplicationsService) { }

  @Post('filtro')
  @Groups(
    AccessProfiles.ADMINISTRATIVE,
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async handle_filter(
    @Body()
    data: FilterApplicationsDTO,
    @Res() res: Response
  ) {
    try {
      const value = await this.filterApplicationsService.list(data);
      return res.status(HttpStatus.OK).send(value);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('find-by-profile/:id')
  async handle_filter_by_profile(
    @Headers('groups') headers: Array<string>,
    @Param('id')
    profile_id,
    @Res() res: Response
  ) {
    if (
      headers.includes('Administrador') ||
      headers.includes('Comercial') ||
      headers.includes('GestaoComercial') ||
      headers.includes('GestaoRecrutamento') ||
      headers.includes('Administrativo') ||
      headers.includes('Recrutador')
    ) {
      try {
        const applications =
          await this.filterApplicationsService.finByProfileId(profile_id);
        return res.status(HttpStatus.ACCEPTED).send(applications);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new NotAcceptableException();
    }
  }
}
