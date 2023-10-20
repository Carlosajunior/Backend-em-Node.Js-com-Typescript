import { AuditRepository } from '@/modules/audit/repositories'
import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { RequestContext } from '@/modules/common/auth/middlewares';
import { CreateColumnDTO } from '../dtos'
import { Columns } from '../entities'
import { CreateColumnService } from '../services'
import { ApiTags } from '@nestjs/swagger';

@Controller('columns')
@ApiTags("columns")
export class CreateColumnController {
  constructor(
    private readonly createColumnService: CreateColumnService,
    private readonly auditRepository: AuditRepository
  ) { }

  @Post()
  async handle(@Body() data: CreateColumnDTO): Promise<Columns> {
    try {
      const created = await this.createColumnService.create(data)
      const event = RequestContext.currentevent()
      if (event) {
        await this.auditRepository.createAudit(event)
      }
      return created
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
