import { Service } from '@/modules/common/shared/core/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { OfferLetterTemplate } from './../entities/offer-letter-template.entity';

@Injectable()
export class ShowOfferLetterTemplateService
  implements Service<string, OfferLetterTemplate>
{
  public constructor(
    private readonly offerLetterTemplateRepository: OfferLetterTemplateRepository
  ) {}

  public async execute(id: string): Promise<OfferLetterTemplate> {
    if (!isUUID(id)) throw new BadRequestException('Template not found.');

    const template = await this.offerLetterTemplateRepository.findOne(id);

    if (!template) throw new BadRequestException('Template not found.');

    return template;
  }
}
