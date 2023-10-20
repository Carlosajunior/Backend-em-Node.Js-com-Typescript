import { Entity } from '@/modules/common/shared/core/entity';
import { BadRequestException } from '@nestjs/common';
import { CreateOfferLetterDTO } from '../dtos/create-offer-letter.dto';

export class PJOffer extends Entity<CreateOfferLetterDTO> {
  private constructor(props: CreateOfferLetterDTO) {
    super(props);
  }

  public static create(props: CreateOfferLetterDTO): PJOffer {
    if (!props?.time_purchase_pj) {
      throw new BadRequestException('O campo Valor Hora PJ é obrigatório.');
    }

    if (!props?.execution_time) {
      throw new BadRequestException(
        'O campo Horário de execução (horas apontadas/horário comercial) é obrigatório.'
      );
    }

    delete props?.mentor;
    delete props?.salary_clt;
    delete props?.work_schedule;

    return new PJOffer(props);
  }
}
