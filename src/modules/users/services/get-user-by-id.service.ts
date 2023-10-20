import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserByIdService implements Service<string, User> {
  private readonly userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(id: string): Promise<User> {
    if (!isUUID(id)) throw new Error('É necessário informar um id válido.');

    const user = await this.userRepository.findOne({
      id
    });

    if (!user) throw new Error('É necessário informar um usuário válido.');

    return UserMapper.toMap(user);
  }
}
