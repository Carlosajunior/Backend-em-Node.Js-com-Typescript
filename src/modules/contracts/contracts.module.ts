import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRepository } from '../audit/repositories';
import { UploadService } from '../common/shared/services';
import { ContractsService } from './services/contracts.service';
import { CustomerContractsController } from './controllers/contract.controller';
import { ContractRepository } from './repositories/contract.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContractRepository])],
  controllers: [CustomerContractsController],
  providers: [AuditRepository, ContractsService, UploadService]
})
export class ContractsModule { }
