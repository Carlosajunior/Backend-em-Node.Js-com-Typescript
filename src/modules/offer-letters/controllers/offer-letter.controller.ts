import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { BadRequestException, Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateOfferLetterDTO } from '../dtos/create-offer-letter.dto';
import { CreateOfferLetterService } from '../services/create-offer-letter.service';

@Controller('offer-letters')
@ApiTags('offer letters')
export class OfferLetterController {
  public constructor(
    private readonly createOffer: CreateOfferLetterService,
    private readonly decodeToken: DecodeTokenService
  ) { }

  @Post()
  @HttpCode(201)
  public async create(
    @Body() data: CreateOfferLetterDTO,
    @Req() request: Request
  ) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const { email } = this.decodeToken.execute(token);

      return await this.createOffer.execute({ ...data, user_email: email });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
