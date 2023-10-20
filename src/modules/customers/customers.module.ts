import { UploadService } from '@/modules/common/shared/services';
import { ContactRepository } from '@/modules/customers/contact/repositories/contact.repository';
import { CustomersController } from '@/modules/customers/controllers/customers.controller';
import { CustomersService } from '@/modules/customers/services/customers.service';
import { LogoRepository } from '@/modules/customers/logo/repositories/logo.repository';
import { CustomerRepository } from '@/modules/customers/repositories/customer.repository';
import { FunnelRepository } from '@/modules/funnel/repositories/funnel.repository';
import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRepository } from '../audit/repositories';
import { ContractsService } from '../contracts/services/contracts.service';
import { ContractRepository } from '../contracts/repositories/contract.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { CustomerContactsController } from './contact/controllers/contact.controller';
import { CreateCustomerContactService } from './contact/services/create-customer-contact.service';
import { GetCustomerAdminsService } from './contact/services/get-customer-admins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttachmentsRepository,
      AuditRepository,
      ContactRepository,
      ContractRepository,
      CustomerRepository,
      FunnelRepository,
      LogoRepository,
      UserRepository
    ])
  ],
  controllers: [CustomersController, CustomerContactsController],
  providers: [
    ContractsService,
    CreateCustomerContactService,
    CustomersService,
    GetCustomerAdminsService,
    UploadService
  ]
})
export class CustomersModule { }
