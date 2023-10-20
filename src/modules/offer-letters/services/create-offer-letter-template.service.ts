import { Service } from '@/modules/common/shared/core/service';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { TemplateStatus } from '../constants/template-status.constant';
import { CreateOfferLetterTemplateDTO } from '../dtos/create-offer-letter-template.dto';
import { OfferLetterTemplate } from '../entities/offer-letter-template.entity';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';

export class CreateOfferLetterTemplateRequest extends CreateOfferLetterTemplateDTO {
  @IsEmail()
  user_email: string;
}

@Injectable()
export class CreateOfferLetterTemplateService
  implements Service<CreateOfferLetterTemplateRequest, OfferLetterTemplate>
{
  public constructor(
    private readonly offerLetterTemplateRepository: OfferLetterTemplateRepository,
    private readonly userRepository: UserRepository
  ) { }
  public async execute(
    request: CreateOfferLetterTemplateRequest
  ): Promise<OfferLetterTemplate> {
    const user = await this.userRepository.findOne({
      where: {
        email: request.user_email
      }
    });

    if (!user) throw new BadRequestException('User not found.');

    const template = this.offerLetterTemplateRepository.create({
      ...request,
      status: TemplateStatus.ACTIVE,
      user_id: user.id
    });

    return await this.offerLetterTemplateRepository.save(template);
  }
}
