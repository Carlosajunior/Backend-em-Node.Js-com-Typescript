import { Service } from '@/modules/common/shared/core/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateResult } from 'typeorm';
import { TemplateStatus } from '../constants/template-status.constant';
import { UpdateOfferLetterTemplateDTO } from '../dtos/update-offer-letter-template.dto';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';

export class UpdateOfferLetterTemplateRequest extends UpdateOfferLetterTemplateDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

@Injectable()
export class UpdateOfferLetterTemplateService
  implements Service<UpdateOfferLetterTemplateRequest, UpdateResult>
{
  public constructor(
    private readonly offerLetterTemplateRepository: OfferLetterTemplateRepository
  ) { }

  public async execute({
    id,
    ...request
  }: UpdateOfferLetterTemplateRequest): Promise<UpdateResult> {
    const template = await this.offerLetterTemplateRepository.findOne({
      where: {
        id
      }
    });

    if (!template) throw new BadRequestException('Template not found.');

    if (template.status === TemplateStatus.DELETED) {
      throw new BadRequestException('Template already deleted.');
    }

    return await this.offerLetterTemplateRepository.update(id, request);
  }
}
