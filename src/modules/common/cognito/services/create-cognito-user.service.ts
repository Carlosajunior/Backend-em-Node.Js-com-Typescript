import { CreateUserDTO } from '@/modules/users/dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { awsConfig, cognitoIdentityServiceProvider } from '../../auth/config';
import { Service } from '../../shared/core/service';
import { CognitoUserMapper } from './../mappers/CognitoUserMapper';

@Injectable()
export class CreateCognitoUserService implements Service<CreateUserDTO, void> {
  public async execute(request: CreateUserDTO): Promise<void> {
    const cognitoUser = CognitoUserMapper.toMap(request);

    try {
      const params = {
        UserPoolId: awsConfig.userPoolId,
        Username: cognitoUser.email,
        UserAttributes: Object.keys(cognitoUser)?.map((key) => ({
          Name: key,
          Value: cognitoUser[key]
        }))
      };

      const {
        User,
        $response: { error }
      } = await cognitoIdentityServiceProvider
        .adminCreateUser(params)
        .promise();

      if (error) {
        throw new Error(error.message);
      }

      if (User) {
        await cognitoIdentityServiceProvider
          .adminAddUserToGroup({
            GroupName: request.access_profile,
            Username: User.Username,
            UserPoolId: awsConfig.userPoolId
          })
          .promise();
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
