import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendEmailService } from '../messages/services';
import { ObservationsRepository } from '../professional-profiles/observations/repositories';
import { UserRepository } from '../users/repositories/user.repository';
import { EmailLinkDossierController } from './controllers/email-link-dossier.controller';
import { ListProfessionalsWithDossierController } from './controllers/list-profissional-with-dossier.controller';
import { DossierRepository } from './repositories/dossier.repository';
import { ListProfessionalsWithDossierService } from './services/list-professional-with-dossier.service';
import { SendMailLinkDossierService } from './services/send-mail-link-dossier.service';

@Module({
  controllers: [EmailLinkDossierController, ListProfessionalsWithDossierController],
  imports: [
    TypeOrmModule.forFeature([
      DossierRepository,
      ObservationsRepository,
      UserRepository
    ])
  ],
  providers: [SendMailLinkDossierService, SendEmailService, ListProfessionalsWithDossierService]
})
export class DossierModule { }
