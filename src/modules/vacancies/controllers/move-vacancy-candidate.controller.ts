import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateColumnIdDTO } from '../dtos/update-column-id.dto';
import { MoveVacancyCandidateService } from '../services/move-vacancy-candidate.service';

@Controller('vacancy/observation-column')
@ApiTags('vacancies')
export class MoveVacancyCandidateController {
  public constructor(
    private readonly moveVacancyCandidate: MoveVacancyCandidateService
  ) {}
  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Body() data: UpdateColumnIdDTO
  ) {
    return await this.moveVacancyCandidate.execute({
      ...data,
      vacancy_id: id
    });
  }
}
