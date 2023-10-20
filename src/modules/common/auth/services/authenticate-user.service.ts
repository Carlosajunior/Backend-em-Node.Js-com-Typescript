import { Injectable } from '@nestjs/common';
import { Auth } from 'aws-amplify';
import { Service } from '../../shared/core/service';
import { AuthDTO } from '../dto/auth.dto';
import { AuthenticatedUser } from '../models/authenticated-user.model';

@Injectable()
export class AuthenticateUserService
  implements Service<AuthDTO, AuthenticatedUser>
{
  public async execute({
    email,
    password
  }: AuthDTO): Promise<AuthenticatedUser> {
    try {
      const resp = await Auth.signIn(email, password);
      const token = resp.signInUserSession.idToken.jwtToken;
      const message_quota =
        resp.signInUserSession.idToken.payload['custom:message_quota'];
      const groups = resp.signInUserSession.idToken.payload['cognito:groups'];
      const user = resp.attributes;
      return { user, token, groups, message_quota };
    } catch (e) {
      throw new Error(e);
    }
  }
}
