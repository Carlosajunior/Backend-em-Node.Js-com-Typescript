import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProfileByOfferLetterStatusDTO } from '../dto/get-profile-by-offer-letters-status.dto';
import { ProfilesOfferLettersService } from '../services/profiles-offer-letters.service';

@Controller('profiles-offer-letters')
@ApiTags('profiles offer letters')
export class ProfilesOfferLettersController {
  constructor(private readonly profilesOfferLettersService: ProfilesOfferLettersService) { }

  @Get()
  async getProfilesByOffetLetterStatus(@Query() data: GetProfileByOfferLetterStatusDTO) {
    try {
      return await this.profilesOfferLettersService.getProfileByOfferLetterStatus(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
