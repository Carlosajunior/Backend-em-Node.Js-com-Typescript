import { TokenPayload } from '@/modules/common/auth/models/token-payload.model';
import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common/decorators';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserOnFirstAccessByTokenPayloadService
  implements Service<TokenPayload, User>
{
  private readonly userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: TokenPayload): Promise<User> {
    const userAlreadyExists = await this.userRepository.existsByEmail(
      request.email
    );

    if (userAlreadyExists) return;

    const userDTO = UserMapper.fromTokenToDTO(request);

    const userModel = UserModel.create(userDTO);

    const user = this.userRepository.create(userModel.props);

    return await this.userRepository.save(user);
  }
}
