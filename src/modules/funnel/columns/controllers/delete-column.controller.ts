import { AuditRepository } from '@/modules/audit/repositories';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { Controller, Delete, HttpStatus, Param, Res, ConflictException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DeleteColumnService } from '../services/delete-column.service';

@Controller('columns')
@ApiTags("columns")
export class DeleteColumnController {
  constructor(
    private readonly deleteColumnService: DeleteColumnService,
    private readonly auditRepository: AuditRepository
  ) { }

  @Delete(':id')
  async handle(@Param() id: string, @Res() res: Response) {
    try {
      await this.deleteColumnService.delete(id);
      const event = RequestContext.currentevent()
      res.status(HttpStatus.OK).send({ message: 'Removido com sucesso!', statusCode: HttpStatus.OK });
      if (event) {
        await this.auditRepository.createAudit(event)
      }
    } catch (error) {
      throw new ConflictException(error)
    }
  }
}
