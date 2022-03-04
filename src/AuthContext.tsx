import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { POOL_DATA } from "./awsConfig";

type props = {
  setAcccessToken: React.Dispatch<
    React.SetStateAction<CognitoAccessToken | undefined>
  >;
  setIdToken: React.Dispatch<React.SetStateAction<CognitoIdToken | undefined>>;
  setRereshToken: React.Dispatch<
    React.SetStateAction<CognitoRefreshToken | undefined>
  >;
  idToken: CognitoIdToken;
  acccessToken: CognitoAccessToken;
  rereshToken: CognitoRefreshToken;
  gCognitoUser: CognitoUser | null;
  gCognitoUserPool: CognitoUserPool;
  setgCognitoUser: React.Dispatch<React.SetStateAction<CognitoUser | null>>;
  authenticationDetails: AuthenticationDetails | undefined;
  setAuthenticationDetails: React.Dispatch<
    React.SetStateAction<AuthenticationDetails | undefined>
  >;
};

export const AuthContext = createContext<Partial<props>>({});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [acccessToken, setAcccessToken] = useState<CognitoAccessToken>();
  const [idToken, setIdToken] = useState<CognitoIdToken>();
  const [rereshToken, setRereshToken] = useState<CognitoRefreshToken>();
  const [gCognitoUser, setgCognitoUser] = useState<CognitoUser | null>(null);
  const [gCognitoUserPool] = useState<CognitoUserPool>(
    new CognitoUserPool(POOL_DATA)
  );
  const [authenticationDetails, setAuthenticationDetails] =
    useState<AuthenticationDetails>();
  useEffect(() => {
    function gInitCognitoUser() {
      setgCognitoUser(gCognitoUserPool.getCurrentUser());
      console.log(gCognitoUser);

      if (!gCognitoUser) {
        console.log("nobody logged in.");
        return;
      }

      gCognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession) => {
          // check whether your session is valid and output the result.
          if (err) {
            console.log("getSession: err: " + JSON.stringify(err));
            return;
          }
          console.log("sessiFon validity: " + session.isValid());
          // gAppendMessage('session: ' + JSON.stringify(session));
          console.log(session);

          // get each tokens and store them into global variables.
          setAcccessToken(session.getAccessToken());
          setIdToken(session.getIdToken());
          setRereshToken(session.getRefreshToken());

          // get and show user attributes.
          gCognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.log("getUserAttributes: err: " + JSON.stringify(err));
            } else {
              console.log("attributes: " + JSON.stringify(attributes));
            }
          });
        }
      );
    }
    gInitCognitoUser();
  }, [setAcccessToken, setIdToken, setRereshToken]);
  return (
    <AuthContext.Provider
      value={{
        setAcccessToken,
        setIdToken,
        setRereshToken,
        idToken,
        acccessToken,
        rereshToken,
        gCognitoUser,
        gCognitoUserPool,
        setgCognitoUser,
        authenticationDetails,
        setAuthenticationDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
