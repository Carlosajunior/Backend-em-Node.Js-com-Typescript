import { RequestContext } from '@/modules/common/auth/middlewares';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetRolesDTO } from '../dto/get-roles.dto';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly usersRepository: UserRepository
  ) { }

  async listRoles(data: GetRolesDTO, groups: Array<AccessProfiles>) {
    try {
      if (groups.includes(AccessProfiles.ADMINISTRATOR)) {
        return await this.rolesRepository.listRoles(data)
      }
      else {
        const email = RequestContext.currentUser().email
        const role_id = await (await this.usersRepository.findOne({ where: { email: email } })).role_id
        return await this.rolesRepository.findRole(role_id)
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async getRoleDetails(role_id: string) {
    try {
      return await this.rolesRepository.getRoleDetails(role_id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

}