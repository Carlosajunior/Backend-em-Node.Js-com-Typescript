import { Entity } from '@/modules/common/shared/core/entity';
import { BadRequestException } from '@nestjs/common';
import { CreateOfferLetterDTO } from '../dtos/create-offer-letter.dto';

export class CLTOffer extends Entity<CreateOfferLetterDTO> {
  private constructor(props: CreateOfferLetterDTO) {
    super(props);
  }

  private static isHours(str: string): boolean {
    const hours = /^([01][0-9]|2[0-3]):[0-5][0-9]+$/;

    return hours.test(str);
  }

  public static create(props: CreateOfferLetterDTO): CLTOffer {
    if (!props?.mentor) {
      throw new BadRequestException('O campo Mentor é obrigatório.');
    }

    if (!props?.salary_clt) {
      throw new BadRequestException(
        'O campo Horário de execução Salário CLT é obrigatório.'
      );
    }

    if (!props?.work_schedule) {
      throw new BadRequestException(
        'O campo Horário de trabalho é obrigatório.'
      );
    }

    const [start, end] = props.work_schedule.split(' - ');

    if (!this.isHours(start)) {
      throw new BadRequestException(
        'Horário de início trabalho é inválido. Máscara deve ser hh:mm, de 00:00 à 23:59.'
      );
    }

    if (!this.isHours(end)) {
      throw new BadRequestException(
        'Horário de final de trabalho é inválido. Máscara deve ser hh:mm, de 00:00 à 23:59.'
      );
    }

    delete props?.time_purchase_pj;
    delete props?.execution_time;

    return new CLTOffer(props);
  }
}
