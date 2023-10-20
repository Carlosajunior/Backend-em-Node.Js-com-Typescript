import { RequestContext } from '@/modules/common/auth/middlewares';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException
} from '@nestjs/common';
import { CreateAuditDTO } from '../dtos';
import { AuditRepository } from '../repositories';

@Injectable()
export class CreateAuditService {
  constructor(
    private readonly auditRepository: AuditRepository,
    private readonly userRepository: UserRepository
  ) {}

  async createAudit(data: CreateAuditDTO) {
    try {
      const currentUser = RequestContext.currentUser();
      data.user_id = currentUser.id;
      data.username = `${currentUser.name} ${currentUser.middle_name}`;
      data.user_email = currentUser.email;
      data.ip = currentUser.ip != undefined ? currentUser.ip : 'null';

      const user = await this.userRepository.findOne({
        where: {
          email: currentUser.email
        }
      });

      if (!user) {
        throw new BadRequestException(
          'Usuário da auditoria não foi encontrado.'
        );
      }

      data.creator_id = user.id;

      return this.auditRepository.createAudit(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
