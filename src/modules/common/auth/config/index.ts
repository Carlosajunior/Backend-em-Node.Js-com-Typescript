import config from '@/config/aws';
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
const { aws } = config;
export const awsConfig = {
  region: process.env.COGNITO_REGION || 'us-east-1',
  userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-east-1_nMcXTaKZV',
  userPoolWebClientId:
    process.env.COGNITO_USER_APP_CLIENT_ID || '3crhuv3k21ef8rco4kh1egb26i',
  domain:
    process.env.COGNITO_DOMAIN ||
    'https://bh-swrecruiter-uds-qa.auth.us-east-1.amazoncognito.com'
};

export const amplifyConfig = {
  mandatorySignin: true,
  region: awsConfig.region,
  userPoolId: awsConfig.userPoolId,
  userPoolWebClientId: awsConfig.userPoolWebClientId,
  authenticationFlowType: 'USER_PASSWORD_AUTH'
};

export const cognitoIdentityServiceProvider =
  new CognitoIdentityServiceProvider({
    region: awsConfig.region,
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey
  });


  export async function getUsersByGroupArray(groupName = 'Administrador') {
    const params = {
      GroupName: groupName,
      UserPoolId: awsConfig.userPoolId,
    };
    const users = await cognitoIdentityServiceProvider
      .listUsersInGroup(params)
      .promise();
      const usernames = users.Users.map(u => u.Attributes.filter((a => a.Name === 'middle_name' || a.Name === 'name')).map(s => (s.Value)).join(' '))
      return usernames
  }