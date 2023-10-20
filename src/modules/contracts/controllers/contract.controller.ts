import { AuditRepository } from '@/modules/audit/repositories';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { UploadService } from '@/modules/common/shared/services';
import { BadRequestException, Body, Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractsService } from '../services/contracts.service';
import { DeleteContractDTO } from '../dto/delete-contract.dto';

@Controller('customers/contracts')
@ApiTags("contracts")
export class CustomerContractsController {
  public constructor(
    private readonly auditRepository: AuditRepository,
    private readonly customerContractsService: ContractsService,
    private readonly uploadService: UploadService
  ) { }

  @Delete(':contract_id')
  @HttpCode(204)
  public async delete(@Body() data: DeleteContractDTO, @Param('contract_id') contract_id: string) {
    try {
      await this.uploadService.deleteFile(data.name, data.customer_id);
      const event = RequestContext.currentevent();
      if (event) await this.auditRepository.createAudit(event);
      return await this.customerContractsService.deleteContractById(contract_id);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
