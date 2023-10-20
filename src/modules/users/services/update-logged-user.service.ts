import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { UpdateLoggedUserDTO } from '../dtos/update-logged-user.dto';
import { LoggedUserMapper } from '../mappers/logged-user.mapper';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserService } from './update-user.service';

@Injectable()
export class UpdateLoggedUserService
  implements Service<UpdateLoggedUserDTO, any>
{
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly updateUser: UpdateUserService
  ) { }

  public async execute(request: UpdateLoggedUserDTO) {
    const isAdmin = request.token_payload['cognito:groups']?.includes(
      AccessProfiles.ADMINISTRATOR
    );
    const user = await this.userRepository.findOne({
      where: {
        email: request.token_payload.email
      }
    });

    if (!user) throw new Error('É necessário informar um usuário válido.');

    if (!isAdmin) {
      const updatableRestrictedUser =
        LoggedUserMapper.toUpdatableRestrictedUser(request);

      return await this.updateUser.execute({ ...user, ...updatableRestrictedUser });
    }

    return await this.updateUser.execute({ ...user, ...request });
  }
}
