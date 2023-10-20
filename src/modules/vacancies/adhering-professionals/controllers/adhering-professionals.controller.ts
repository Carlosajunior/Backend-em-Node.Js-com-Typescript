import { SearchProfileDTO } from '@/modules/professional-profiles/search/dtos';
import { BadRequestException, Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteAdheringProfessionalByProfileIdDTO } from '../dtos/delete-adhering-professional-by-profile-id.dto';
import { DeleteAdheringProfessionalService } from '../services/delete-adhering-professional.service';
import { ListAdheringProfessionalsByVacancyIdService } from '../services/list-adhering-professionals-by-vacancy-id.service';

@Controller('vacancies/adhering-professionals')
@ApiTags('vacancies - adhering professionals')
export class AdheringProfessionalsController {
  public constructor(
    private readonly deleteAdheringProfessional: DeleteAdheringProfessionalService,
    private readonly listAdheringProfessionals: ListAdheringProfessionalsByVacancyIdService
  ) { }

  @Get(':vacancy_id')
  public async index(
    @Param('vacancy_id') vacancy_id: number,
    @Query() query: SearchProfileDTO
  ) {
    try {
      return await this.listAdheringProfessionals.execute({
        ...query,
        vacancy_id
      });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':vacancy_id')
  public async delete(
    @Param('vacancy_id') vacancy_id: number,
    @Body() data: DeleteAdheringProfessionalByProfileIdDTO
  ) {
    try {
      return await this.deleteAdheringProfessional.execute({
        ...data,
        vacancy_id
      });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
