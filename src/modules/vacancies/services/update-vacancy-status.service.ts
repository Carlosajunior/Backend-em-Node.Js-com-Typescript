import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UpdateVacancyStatusDTO } from '../dtos/update-status.dto';
import { VacancyRepository } from '../repositories/vacancy.repository';

@Injectable()
export class UpdateVacancyStatusService
  implements Service<UpdateVacancyStatusDTO, UpdateResult>
{
  constructor(private readonly vacancyRepository: VacancyRepository) { }

  public async execute({ id, ...data }: UpdateVacancyStatusDTO) {
    return await this.vacancyRepository.update(id, data);
  }
}
