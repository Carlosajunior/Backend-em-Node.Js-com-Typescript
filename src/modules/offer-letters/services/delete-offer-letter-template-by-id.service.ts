import { Service } from '@/modules/common/shared/core/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { TemplateStatus } from '../constants/template-status.constant';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { ShowOfferLetterTemplateService } from './show-offer-letter-template.service';

@Injectable()
export class DeleteOfferLetterTemplateByIdService
  implements Service<string, UpdateResult>
{
  public constructor(
    private readonly offerLetterTemplateRepository: OfferLetterTemplateRepository,
    private readonly showTemplate: ShowOfferLetterTemplateService
  ) { }

  public async execute(id: string): Promise<UpdateResult> {
    const template = await this.showTemplate.execute(id);

    if (template.status === TemplateStatus.DELETED)
      throw new BadRequestException('Template already deleted.');

    return await this.offerLetterTemplateRepository.update(id, {
      status: TemplateStatus.DELETED
    });
  }
}
