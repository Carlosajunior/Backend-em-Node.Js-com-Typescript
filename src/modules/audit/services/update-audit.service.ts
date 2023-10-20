import { UserRepository } from '@/modules/users/repositories/user.repository';
import {
  Injectable,
  NotAcceptableException
} from '@nestjs/common';
import { AuditRepository } from '../repositories';

@Injectable()
export class UpdateAuditService {
  constructor(
    private readonly auditRepository: AuditRepository,
    private readonly userRepository: UserRepository
  ) {}

  async updateCreatorId() {
    try {
      const audits = await this.auditRepository.updateCreatorId();
      for (const audit of audits) {
        const user = await this.userRepository.findOne({
          where: {
            email: audit.user_email
          }
        })
        if (user) {
          await this.auditRepository.update(audit.id, {
            creator_id: user.id
          })
        }
      }
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
