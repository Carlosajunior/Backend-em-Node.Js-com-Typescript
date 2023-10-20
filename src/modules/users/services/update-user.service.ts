import { FindCognitoUserService } from '@/modules/common/cognito/services/find-cognito-user.service';
import { UpdateCognitoUserService } from '@/modules/common/cognito/services/update-cognito-user.service';
import { Service } from '@/modules/common/shared/core/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDTO } from './../dtos/update-user.dto';

export interface UpdateUserRequest extends UpdateUserDTO {
  id: string;
}

@Injectable()
export class UpdateUserService implements Service<UpdateUserRequest, void> {
  public constructor(
    private readonly findCognitoUser: FindCognitoUserService,
    private readonly updateCognitoUser: UpdateCognitoUserService,
    private readonly userRepository: UserRepository
  ) { }
  public async execute(request: UpdateUserRequest): Promise<void> {
    if (!isUUID(request.id))
      throw new Error('É necessário informar um id válido.');

    const userById = await this.userRepository.findOne({
      where:{id: request.id}
    });

    if (!userById) throw new Error('É necessário informar um usuário válido.');

    const userByEmail = await this.userRepository.findOne({
      where: {
        email: request.email
      }
    });

    if (userByEmail) {
      if (userByEmail.email !== userById.email)
        throw new Error('O e-mail informado já foi cadastrado.');
    }

    const userModel = UserModel.create(request);

    const userToUpdate = this.userRepository.create({
      ...userModel.props,
      is_active: request.is_active,
      //: request.id
    });

    const cognitoUser = await this.findCognitoUser.execute(userById.email);

    if (!cognitoUser) {
      throw new BadRequestException('É necessário informar um usuário válido.');
    }

    await this.userRepository.manager.transaction(async (manager) => {
      await this.updateCognitoUser.execute({
        ...userModel.props,
        cognito_id: cognitoUser.Username,
        is_active: request.is_active,
        id: request.id,
        old_group: userById.access_profile,
        must_change_email: userById.email !== request.email,
        must_change_status: userById.is_active !== request.is_active,
        must_update_group: userById.access_profile !== request.access_profile
      });

      await manager.save(userToUpdate);
    });
  }
}
