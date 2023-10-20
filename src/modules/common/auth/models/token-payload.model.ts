import { AccessProfiles } from '../../shared/constants/access-profiles';

export interface TokenPayload {
  'cognito:groups'?: AccessProfiles[];
  'cognito:username'?: string;
  'custom:message_quota'?: string;
  'custom:position'?: string;
  'custom:signature'?: string;
  'custom:whatsapp'?: string;
  aud: string;
  auth_time: number;
  email: string;
  email_verified: boolean;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  middle_name: string;
  name: string;
  origin_jti: string;
  id: string;
  token_use: string;
}
