import {
  awsConfig,
  cognitoIdentityServiceProvider
} from '@/modules/common/auth/config';
import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';
import { UsersInBulkMapper } from '../mappers/users-in-bulk.mapper';
import { UserRepository } from '../repositories/user.repository';
import { COGNITO_GROUPS } from './../../common/shared/constants/access-profiles';

@Injectable()
export class CreateUsersInBulkService implements Service<void, void> {
  public constructor(private readonly userRepository: UserRepository) {}
  public async execute(): Promise<void> {
    try {
      const users = await this.userRepository.find({
        take: 1
      });

      if (users?.length > 0) return;

      const usersInGroup = await Promise.all(
        COGNITO_GROUPS.map(async (group) => {
          const { Users } = await cognitoIdentityServiceProvider
            .listUsersInGroup({
              GroupName: group,
              UserPoolId: awsConfig.userPoolId
            })
            .promise();

          return {
            group,
            users: Users
          };
        })
      );

      const usersToCreate = UsersInBulkMapper.toDTO(usersInGroup);

      await Promise.all(
        usersToCreate.map(async (data) => {
          const user = this.userRepository.create(data);

          await this.userRepository.save(user);
        })
      );
    } catch (e) {
      if (
        e?.message?.includes('duplicate key value violates unique constraint')
      )
        return;
      throw new Error(e);
    }
  }
}
