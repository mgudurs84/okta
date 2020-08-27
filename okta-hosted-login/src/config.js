const CLIENT_ID = process.env.CLIENT_ID || '0oa51482gov8t0hcf4x6';
const ISSUER = process.env.ISSUER || 'https://dev-588106.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    autoRenew:false,
    tokenManager: {
      autoRenew: true,
      expireEarlySeconds: 240
       }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
