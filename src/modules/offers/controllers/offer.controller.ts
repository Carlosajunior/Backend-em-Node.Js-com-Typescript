import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OfferDTO } from '../dtos/offer.dto';
import { CreateOfferService } from '../services/create-offer.service';

@Controller('offers')
@ApiTags('offers')
export class OfferController {
  public constructor(private createOfferService: CreateOfferService) { }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: OfferDTO) {
    try {
      await this.createOfferService.execute(data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
