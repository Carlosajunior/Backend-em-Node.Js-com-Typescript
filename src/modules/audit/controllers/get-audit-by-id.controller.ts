import { GetAuditByIdService } from '@/modules/audit/services'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetAuditByIdDTO } from '../dtos/get-audit-by-id.dto'

@ApiTags('audit')
@Controller('audit')
export class AuditHistoryController {
  constructor(private readonly getAuditByIdService: GetAuditByIdService) { }

  @Get('history')
  async handle(@Query() data: GetAuditByIdDTO) {
    try {
      return await this.getAuditByIdService.get(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
