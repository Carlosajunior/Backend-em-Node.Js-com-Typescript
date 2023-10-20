import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './../repositories/user.repository';
import { CreateCognitoUserService } from '@/modules/common/cognito/services/create-cognito-user.service';
import { FindCognitoUserService } from '@/modules/common/cognito/services/find-cognito-user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserModel } from '../models/user.model';

@Injectable()
export class CreateUserService implements Service<CreateUserDTO, void> {
  private readonly cognitoCreateUser: CreateCognitoUserService;
  private readonly cognitoFindUser: FindCognitoUserService;
  private readonly userRepository: UserRepository;
  public constructor(
    cognitoCreateUser: CreateCognitoUserService,
    cognitoFindUser: FindCognitoUserService,
    userRepository: UserRepository
  ) {
    this.cognitoCreateUser = cognitoCreateUser;
    this.cognitoFindUser = cognitoFindUser;
    this.userRepository = userRepository;
  }

  public async execute(request: CreateUserDTO): Promise<void> {
    try {
      const userAlreadyExists = await this.userRepository.existsByEmail(
        request.email
      );

      if (userAlreadyExists) {
        throw new Error(
          'O e-mail enviado já está cadastrado na base de dados.'
        );
      }

      const cognitoUser = await this.cognitoFindUser.execute(request.email);

      if (cognitoUser) {
        throw new Error(
          'O e-mail enviado já está cadastrado na base de dados.'
        );
      }

      const userModel = UserModel.create(request);

      const user = this.userRepository.create(userModel.props);
      let savedUser
      await this.userRepository.manager.transaction(async (manager) => {
        savedUser = await manager.save(user);
        await this.cognitoCreateUser.execute(userModel.props);
      });
      return savedUser
    } catch (e) {
      throw new Error(e);
    }
  }
}
