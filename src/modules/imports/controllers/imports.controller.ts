import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ImportsService } from '../services/imports.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@Controller('imports')
@ApiTags("imports")
export class ImportsController {
  constructor(private readonly importsService: ImportsService) { }

  @Get('vacancies-portal-profiles')
  public async updateVacanciesPortalProfiles(
    @Res() res: Response,
    @Query() { take, page }: any
  ) {
    try {
      this.importsService.updateExistingVancanciesPortalProfiles({
        records_per_page: take,
        page: page
      })
      return res.status(HttpStatus.OK).send('done')
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('internal-profiles')
  public async updateInternalProfiles(
    @Res() res: Response
  ) {
    try {
      this.importsService.updateExistingInternalProfiles({})
      return res.status(HttpStatus.OK).send('done')
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  public async createImport(
    @Query() { logImportId, profileId }: any,
    @Body() body: any,
    @Res() res: Response
  ) {
    try {
      const response = await this.importsService.updateProfileByImport(body, logImportId, profileId)
      return res.status(HttpStatus.CREATED).send(response);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
