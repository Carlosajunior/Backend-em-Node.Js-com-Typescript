import { Module } from '@nestjs/common';

import { QueueController } from '@/modules/messages/controllers';
import {
  MessageService,
  SendEmailService,
  SendSmsService
} from '@/modules/messages/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRepository } from '../audit/repositories';
import { ProfilesRepository } from '../professional-profiles/profiles/repositories';
import { TemplateRepository } from '../templates/repositories/template.repository';
import { VacancyRepository } from '../vacancies/repositories/vacancy.repository';
import { MessagesController } from './controllers/messages.controller';
import { SendMessageProducer } from './queue/send-message.producer';
import { MessagesRepository } from './repositories';
import { MessagesToProfilesRepository } from './repositories/message-to-profile.repository';
import { DecrementUserMessageQuotaPerDayService } from './services/decrement-user-message-quota-per-day.service';
import { SendVacancyMessageService } from './services/send-vacancy-message.service';
import { OfferLetterRepository } from '../offer-letters/repositories/offer-letter.repository';
import { ProfileOfferLettersRepository } from '../professional-profiles/profiles-offer-letters/repositories/profile-offer-letters.repository';
import { SendOfferLetterService } from './services/send-offer-letter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditRepository,
      MessagesRepository,
      MessagesToProfilesRepository,
      ProfilesRepository,
      TemplateRepository,
      VacancyRepository,
      OfferLetterRepository,
      ProfileOfferLettersRepository
    ])
  ],
  controllers: [QueueController, MessagesController],
  providers: [
    DecrementUserMessageQuotaPerDayService,
    MessageService,
    SendEmailService,
    SendMessageProducer,
    SendSmsService,
    SendVacancyMessageService,
    SendOfferLetterService
  ],
  exports: [SendEmailService]
})
export class MessagesModule { }
