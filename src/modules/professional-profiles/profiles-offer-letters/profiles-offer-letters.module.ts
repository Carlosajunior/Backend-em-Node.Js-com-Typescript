import { Module } from '@nestjs/common';
import { ProfilesOfferLettersService } from './services/profiles-offer-letters.service';
import { ProfilesOfferLettersController } from './controllers/profiles-offer-letters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileOfferLettersRepository } from './repositories/profile-offer-letters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileOfferLettersRepository])],
  controllers: [ProfilesOfferLettersController],
  providers: [ProfilesOfferLettersService]
})
export class ProfilesOfferLettersModule { }
