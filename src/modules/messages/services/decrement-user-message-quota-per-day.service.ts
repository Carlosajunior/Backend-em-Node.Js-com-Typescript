import {
  awsConfig,
  cognitoIdentityServiceProvider
} from '@/modules/common/auth/config';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { Injectable } from '@nestjs/common';

interface RequestDTO {
  messageQuota: number;
  decrementNumber: number;
}

@Injectable()
export class DecrementUserMessageQuotaPerDayService {
  public async execute(request: RequestDTO): Promise<void> {
    await new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.adminUpdateUserAttributes(
        {
          UserAttributes: [
            {
              Name: 'custom:message_quota',
              Value: `${request.messageQuota - request.decrementNumber}`
            }
          ],
          UserPoolId: awsConfig.userPoolId,
          Username: RequestContext.currentUser().sub
        },
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    });
  }
}
