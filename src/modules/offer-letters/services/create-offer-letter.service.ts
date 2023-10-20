import { DateHelper } from '@/modules/common/shared/utils/date.helper';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { TemplateStatus } from '../constants/template-status.constant';
import { TypeOfContract } from '../constants/type-of-contract.constant';
import { CreateOfferLetterDTO } from '../dtos/create-offer-letter.dto';
import { OfferLetter } from '../entities/offer-letter.entity';
import { CLTOffer } from '../models/clt-offer.model';
import { PJOffer } from '../models/pj-offer.model';
import { OfferLetterTemplateRepository } from '../repositories/offer-letter-template.repository';
import { OfferLetterRepository } from '../repositories/offer-letter.repository';
import { Service } from './../../common/shared/core/service';

export class CreateOfferLetterRequest extends CreateOfferLetterDTO {
  @IsEmail()
  user_email: string;
}
@Injectable()
export class CreateOfferLetterService
  implements Service<CreateOfferLetterRequest, OfferLetter>
{
  public constructor(
    private readonly offerRepository: OfferLetterRepository,
    private readonly offerLetterTemplateRepository: OfferLetterTemplateRepository,
    private readonly userRepository: UserRepository,
    private readonly vacancyRepository: VacancyRepository
  ) { }

  public async execute(request: CreateOfferLetterRequest) {
    let [start, end] = ['', ''];
    const user = await this.userRepository.findOne({
      where: {
        email: request.user_email
      }
    });

    if (!user) throw new BadRequestException('User not found.');

    const template = await this.offerLetterTemplateRepository.findOne({
      where: {
        id: request.offer_letter_template_id
      }
    });

    if (!template) throw new BadRequestException('Template not found.');

    if (template.status !== TemplateStatus.ACTIVE)
      throw new BadRequestException('Template are not active.');

    const vacancy = await this.vacancyRepository.findOne({
      where: {
        id: request.vacancy_id
      }
    });

    if (!vacancy) throw new BadRequestException('Vacancy not found.');

    if (vacancy.status !== 'Aberto')
      throw new BadRequestException('Vacancy are not active.');

    const { props } =
      request?.type_of_contract === TypeOfContract.CLT
        ? CLTOffer.create(request)
        : PJOffer.create(request);

    if (props?.work_schedule) {
      [start, end] = props.work_schedule.split(' - ');
    }

    const offer = this.offerRepository.create({
      ...props,
      user_id: user.id,
      work_schedule_from: props?.work_schedule
        ? DateHelper.hoursToMinutes(start)
        : null,
      work_schedule_to: props?.work_schedule
        ? DateHelper.hoursToMinutes(end)
        : null
    });

    return await this.offerRepository.save(offer);
  }
}
