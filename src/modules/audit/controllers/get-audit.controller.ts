import { Body, Controller, Headers, HttpStatus, NotAcceptableException, Post, Query, Res } from '@nestjs/common';
import { GetAuditDTO } from '@/modules/audit/dtos';
import { GetAuditService } from '@/modules/audit/services';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('history')
@Controller('history')
export class GetAuditController {
  constructor(private readonly getAuditService: GetAuditService) { }

  @Post('')
  async handle(
    @Headers('groups') headers: Array<string>,
    @Body() { module, date_start, date_end, date, date_option, user }: GetAuditDTO,
    @Query() { page, records_per_page }: any,
    @Res() res: Response
  ) {
    if (headers.includes('Administrador')) {
      const value = await this.getAuditService.list({
        page: page && Math.floor(page),
        records_per_page: records_per_page && Math.floor(records_per_page),
        module,
        date_start,
        date_end,
        date,
        date_option,
        user
      });
      if (value.total_results !== 0) {
        res.status(HttpStatus.OK).send(value);
        return value;
      } else {
        res.status(HttpStatus.NOT_FOUND).send(value);
        return value;
      }
    }
    throw new NotAcceptableException();
  }
}
