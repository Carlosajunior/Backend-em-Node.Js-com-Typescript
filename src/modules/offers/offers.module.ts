import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from '../customers/contact/repositories/contact.repository';
import { VacancyRepository } from '../vacancies/repositories/vacancy.repository';
import { OfferController } from './controllers/offer.controller';
import { OfferRepository } from './repositories/offer.repository';
import { CreateOfferService } from './services/create-offer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactRepository,
      OfferRepository,
      VacancyRepository
    ])
  ],
  controllers: [OfferController],
  providers: [CreateOfferService]
})
export class OffersModule {}
