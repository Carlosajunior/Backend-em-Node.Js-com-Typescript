import { Controller, Get, HttpStatus, Query, Res, Headers, NotAcceptableException } from '@nestjs/common'
import { GetApplicationsByVacancyIdService } from '../services'
import { ApplyDTO } from '../dtos'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@Controller('applications')
@ApiTags("vacancies applications")
export class GetApplicationsByVacancyIdController {
  constructor(private readonly getApplicationsByVacancyIdService: GetApplicationsByVacancyIdService) { }

  @Get()
  async handle(@Headers("groups") headers: Array<string>, @Query() {
    records_per_page,
    page,
    vacancy_id
  }: ApplyDTO, @Res() res: Response) {
    if (headers.includes("Administrador") || headers.includes("Comercial") || headers.includes("GestaoRecrutamento") || headers.includes("GestaoComercial") || headers.includes("Recrutador")) {
      const value = await this.getApplicationsByVacancyIdService.list({
        records_per_page,
        page,
        vacancy_id
      }, headers)
      if (value.total_results !== 0) {
        res
          .status(HttpStatus.OK)
          .send(value)
        return value
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send(value)
        return value
      }
    }
    return new NotAcceptableException()
  }
}
