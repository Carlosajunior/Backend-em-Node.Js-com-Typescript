import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateApplicationsService } from '../services/update-applications.service';
import { Response } from 'express'
import { InsertObservationsDTO } from '../dtos/insert-observations.dto';
export interface UpdateDTO {
  [key: string]: any;
}
@Controller('applications')
@ApiTags("vacancies applications")
export class UpdateApplicationsController {
  constructor(private readonly updateApplicationsService: UpdateApplicationsService) { }

  @Put(':id')
  async updateFunnel(@Param() id: string, @Body() data: UpdateDTO) {
    try {
      return await this.updateApplicationsService.update(id, data);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  @Get('vacancy')
  async insertObservationsIntoElasticByVacancy(
    @Query() { vacancy_id } : InsertObservationsDTO,
    @Res() res: Response
  ){
    try {
      this.updateApplicationsService.updateAllVacancyAdheringProfiles({}, vacancy_id)
      return res.status(HttpStatus.OK).send('done')
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
