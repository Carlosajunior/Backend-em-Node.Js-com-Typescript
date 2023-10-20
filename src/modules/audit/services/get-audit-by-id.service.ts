import { AuditRepository } from '@/modules/audit/repositories'
import { Injectable, NotFoundException } from '@nestjs/common'
import { GetAuditByIdDTO } from '../dtos/get-audit-by-id.dto'

@Injectable()
export class GetAuditByIdService {
  constructor(
    private readonly auditRepository: AuditRepository
  ) { }

  async get(data: GetAuditByIdDTO) {
    try {
      return await this.auditRepository.findByID(data)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
