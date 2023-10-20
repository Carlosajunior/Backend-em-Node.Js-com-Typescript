import { Observation } from '../entities';

import { subHours } from 'date-fns';

export interface ObservationDTO extends Observation {
  created_at_utc_br: Date;
  client?: string;
}

export class ObservationMapper {
  public static toDTO(raw: Observation): ObservationDTO {
    const client = raw?.vacancy?.customer;

    const observationDTO: ObservationDTO = {
      ...raw,
      created_at_utc_br: subHours(raw?.created_at, 3),
      client: client ? client[0]?.name : null
    };

    return observationDTO;
  }
}
