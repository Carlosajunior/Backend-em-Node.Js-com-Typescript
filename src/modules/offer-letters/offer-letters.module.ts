import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecodeTokenService } from '../common/auth/services/decode-token.service';
import { UserRepository } from '../users/repositories/user.repository';
import { VacancyRepository } from '../vacancies/repositories/vacancy.repository';
import { OfferLetterTemplateController } from './controllers/offer-letter-template.controller';
import { OfferLetterController } from './controllers/offer-letter.controller';
import { OfferLetterTemplateRepository } from './repositories/offer-letter-template.repository';
import { OfferLetterRepository } from './repositories/offer-letter.repository';
import { ChangeStatusOfferLetterTemplateByIdService } from './services/change-status-offer-letter-template-by-id.service';
import { CreateOfferLetterTemplateService } from './services/create-offer-letter-template.service';
import { CreateOfferLetterService } from './services/create-offer-letter.service';
import { DeleteOfferLetterTemplateByIdService } from './services/delete-offer-letter-template-by-id.service';
import { ListOfferLetterTemplatesService } from './services/list-offer-letter-templates.service';
import { ShowOfferLetterTemplateService } from './services/show-offer-letter-template.service';
import { UpdateOfferLetterTemplateService } from './services/update-offer-letter-template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfferLetterRepository,
      OfferLetterTemplateRepository,
      UserRepository,
      VacancyRepository
    ])
  ],
  controllers: [OfferLetterController, OfferLetterTemplateController],
  providers: [
    ChangeStatusOfferLetterTemplateByIdService,
    CreateOfferLetterService,
    CreateOfferLetterTemplateService,
    DecodeTokenService,
    DeleteOfferLetterTemplateByIdService,
    ListOfferLetterTemplatesService,
    ShowOfferLetterTemplateService,
    UpdateOfferLetterTemplateService
  ]
})
export class OfferLettersModule {}
