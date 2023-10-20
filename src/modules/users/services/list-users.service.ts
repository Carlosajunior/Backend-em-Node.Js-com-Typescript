import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { ListUsersDTO } from '../dtos/list-users.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class ListUsersService implements Service<ListUsersDTO, any> {
  private readonly userRepository: UserRepository;
  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(request?: ListUsersDTO) {
    return this.userRepository.paginate(request);
  }
}
