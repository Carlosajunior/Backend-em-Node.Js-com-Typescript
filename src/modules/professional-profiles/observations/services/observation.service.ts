import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ObservationService {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  public async listAllProfileObservations(id: string) {
    return await this.observationsRepository.listObservationsByProfile(id);
  }
}
