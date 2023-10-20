import { TokenPayload } from '@/modules/common/auth/models/token-payload.model';
import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { LoggedUserMapper } from '../mappers/logged-user.mapper';
import { UserMapper } from '../mappers/user.mapper';
import { LoggedUserRestricted } from '../models/logged-user-restricted.model';
import { UserRepository } from '../repositories/user.repository';
import { AccessProfiles } from './../../common/shared/constants/access-profiles';

@Injectable()
export class ShowLoggedUserService
  implements Service<TokenPayload, LoggedUserRestricted | User>
{
  private readonly userRepository: UserRepository;
  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(
    request: TokenPayload
  ): Promise<LoggedUserRestricted | User> {
    const isAdmin = request['cognito:groups']?.includes(
      AccessProfiles.ADMINISTRATOR
    );

    const user = await this.userRepository.findOne({
      where: {
        email: request.email
      }
    });

    if (!user) throw new Error('É necessário informar um usuário válido.');

    if (isAdmin) return UserMapper.toMap(user);

    return LoggedUserMapper.toMap(user);
  }
}
