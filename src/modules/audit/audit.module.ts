import {
  AuditHistoryController,
  GetAuditController
} from '@/modules/audit/controllers';
import { AuditRepository } from '@/modules/audit/repositories';
import { GetAuditByIdService, GetAuditService, UpdateAuditService } from '@/modules/audit/services';
import {
  ColumnsSubscriber,
  ContactSubscriber,
  CustomerSubscriber,
  FunnelSubscriber,
  MessageSubscriber,
  NoteSubscriber,
  VacanciesSubscriber
} from '@/modules/audit/subscribers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepository } from '../common/tags/repositories';
import { UserRepository } from '../users/repositories/user.repository';
import { ExtractTagsJob } from '../vacancies/queues/jobs/extract-tags.job';
import { VacancyRepository } from '../vacancies/repositories/vacancy.repository';
import { CreateAuditController } from './controllers/create-audit.controller';
import { CreateAuditService } from './services/create-audit.service';
import { AuditSubscriber } from './subscribers/audit.subscriber';
import { MessagesToProfileSubscriber } from './subscribers/messages-to-profile.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditRepository,
      TagsRepository,
      UserRepository,
      VacancyRepository
    ])
  ],
  controllers: [
    AuditHistoryController,
    GetAuditController,
    CreateAuditController
  ],
  providers: [
    AuditSubscriber,
    ColumnsSubscriber,
    ContactSubscriber,
    CreateAuditService,
    CustomerSubscriber,
    ExtractTagsJob,
    FunnelSubscriber,
    GetAuditByIdService,
    UpdateAuditService,
    GetAuditService,
    MessageSubscriber,
    MessagesToProfileSubscriber,
    NoteSubscriber,
    VacanciesSubscriber
  ]
})
export class AuditsModule {}
