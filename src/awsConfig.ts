export const REGION = process.env.REACT_APP_REGION || "";
export const POOL_DATA = {
  UserPoolId: process.env.REACT_APP_USERPOOLID || "",
  ClientId: process.env.REACR_APP_CLIENTID || ""
};
export const IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID || ""
export const LOGINS_KEY = 'cognito-idp.' + REGION + '.amazonaws.com/' + POOL_DATA.UserPoolId;
