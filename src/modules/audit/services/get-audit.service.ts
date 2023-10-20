import { Injectable } from '@nestjs/common'

import { GetAuditDTO } from '@/modules/audit/dtos'
import { Audit } from '@/modules/audit/entities'
import { AuditRepository } from '@/modules/audit/repositories'
import { ListEntitiesModel } from '@/modules/common/shared/models'

@Injectable()
export class GetAuditService {
  constructor (
    private readonly auditRepository: AuditRepository
  ) {}

  async list ({
    records_per_page = 15,
    page = 1,
    module,
    date_start,
    date_end,
    date,
    date_option = 'between',
    user
  }: GetAuditDTO): Promise<ListEntitiesModel<Audit>> {
    return await this.auditRepository.findAudit({
      records_per_page,
      page,
      module,
      date_start,
      date_end,
      date,
      date_option,
      user
    })
  }
}
