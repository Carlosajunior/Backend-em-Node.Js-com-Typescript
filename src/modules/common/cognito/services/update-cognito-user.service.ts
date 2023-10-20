import { UpdateUserDTO } from '@/modules/users/dtos/update-user.dto';
import { Injectable } from '@nestjs/common';
import { awsConfig, cognitoIdentityServiceProvider } from '../../auth/config';
import { Service } from '../../shared/core/service';
import { CognitoUserMapper } from '../mappers/CognitoUserMapper';

interface UpdateUserRequest extends UpdateUserDTO {
  id: string;
  cognito_id: string;
  old_group: string;
  must_change_email: boolean;
  must_change_status: boolean;
  must_update_group: boolean;
}

@Injectable()
export class UpdateCognitoUserService
  implements Service<UpdateUserRequest, void>
{
  public async execute(request: UpdateUserRequest): Promise<void> {
    const cognitoUser = CognitoUserMapper.toMap(request);

    try {
      const params = {
        UserPoolId: awsConfig.userPoolId,
        Username: request.cognito_id,
        UserAttributes: Object.keys(cognitoUser)?.map((key) => ({
          Name: key,
          Value: cognitoUser[key]
        }))
      };

      const {
        $response: { error }
      } = await cognitoIdentityServiceProvider
        .adminUpdateUserAttributes(params)
        .promise();

      if (error) {
        throw new Error(error.message);
      }

      if (request.must_update_group) {
        await cognitoIdentityServiceProvider
          .adminRemoveUserFromGroup({
            GroupName: request.old_group,
            UserPoolId: awsConfig.userPoolId,
            Username: request.cognito_id
          })
          .promise();

        await cognitoIdentityServiceProvider
          .adminAddUserToGroup({
            GroupName: request.access_profile,
            UserPoolId: awsConfig.userPoolId,
            Username: request.cognito_id
          })
          .promise();
      }

      if (request.must_change_status) {
        request.is_active
          ? await cognitoIdentityServiceProvider
              .adminDisableUser({
                UserPoolId: awsConfig.userPoolId,
                Username: request.cognito_id
              })
              .promise()
          : await cognitoIdentityServiceProvider
              .adminEnableUser({
                UserPoolId: awsConfig.userPoolId,
                Username: request.cognito_id
              })
              .promise();
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
