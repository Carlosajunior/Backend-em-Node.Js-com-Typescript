import {
  awsConfig,
  cognitoIdentityServiceProvider
} from '@/modules/common/auth/config';
import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UpdateResult } from 'typeorm';
import { UserRepository } from './../repositories/user.repository';
@Injectable()
export class ChangeUserStatusService implements Service<string, UpdateResult> {
  private readonly userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<UpdateResult> {
    if (!isUUID(id)) throw new Error('É necessário informar um id válido.');

    const user = await this.userRepository.findOne({
      id
    });

    if (!user) throw new Error('É necessário informar um usuário válido.');

    const params = {
      UserPoolId: awsConfig.userPoolId,
      Username: user.email
    };

    user.is_active
      ? await cognitoIdentityServiceProvider.adminDisableUser(params).promise()
      : await cognitoIdentityServiceProvider.adminEnableUser(params).promise();

    return await this.userRepository.update(id, {
      ...user,
      is_active: !user.is_active
    });
  }
}
