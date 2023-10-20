import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserMapper } from './user.mapper';

interface UsersInGroup {
  group: string;
  users: CognitoIdentityServiceProvider.UsersListType;
}

export class UsersInBulkMapper {
  public static toDTO(raw: UsersInGroup[]): CreateUserDTO[] {
    const groupsWithUsers: UsersInGroup[] = [];
    const users: CreateUserDTO[] = [];

    raw.forEach((data) => {
      if (data.users.length > 0) groupsWithUsers.push(data);
    });

    groupsWithUsers?.forEach((data) => {
      data.users.forEach((user) => {
        users.push(
          UserMapper.fromCognitoUserToDTO({ ...user, Group: data.group })
        );
      });
    });

    return users;
  }
}
