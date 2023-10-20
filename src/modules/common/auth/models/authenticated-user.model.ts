export interface User {
  id: string;
  email_verified: boolean;
  'custom:message_quota': string;
  name: string;
  middle_name: string;
  email: string;
}

export interface AuthenticatedUser {
  user: User;
  token: string;
  groups: string[];
  message_quota: string;
}
