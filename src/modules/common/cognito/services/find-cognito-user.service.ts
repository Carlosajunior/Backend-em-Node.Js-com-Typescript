/* eslint-disable no-useless-escape */
import { Injectable } from '@nestjs/common';
import { awsConfig, cognitoIdentityServiceProvider } from '../../auth/config';
import { Service } from '../../shared/core/service';

@Injectable()
export class FindCognitoUserService implements Service<string, any> {
  public async execute(email: string) {
    try {
      const res = await cognitoIdentityServiceProvider
        .listUsers({
          UserPoolId: awsConfig.userPoolId,
          Limit: 1,
          Filter: `email = \"${email}\"`
        })
        .promise();

      if (res?.$response.error) {
        return null;
      }

      const data = res?.$response.data;

      if (data) {
        return data.Users.length > 0 ? data.Users[0] : null;
      }

      return null;
    } catch (e) {
      throw new Error(e);
    }
  }
}
