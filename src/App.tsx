import "./login.css";
import "./App.css";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const App = () => {
  const navigate = useNavigate();
  const { gCognitoUserPool, setgCognitoUser, setAuthenticationDetails } =
    useContext(AuthContext);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    console.log(gCognitoUserPool);
    if (!gCognitoUserPool) return;
    console.log("A function " + userName + " has started.");

    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password,
    });

    // override the global variable "gCognitoUser" object.
    const gCognitoUser = new CognitoUser({
      Username: userName,
      Pool: gCognitoUserPool,
    });
    if (setgCognitoUser) setgCognitoUser(gCognitoUser);
    if (setAuthenticationDetails)
      setAuthenticationDetails(authenticationDetails);

    gCognitoUser.setAuthenticationFlowType("CUSTOM_AUTH");
    gCognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("result: ", result);
      },
      customChallenge: function (challengeParameters) {
        console.log(
          "reached custom challenge area" + JSON.stringify(challengeParameters)
        );
        console.log(challengeParameters);
        switch (challengeParameters.challenge) {
          case "yama": {
            console.log("reached custom challenge kawa");
            navigate("/first");
            break;
          }
          case "hoge": {
            console.log("reached custom challenge hoge");
            alert("not hoge");
          }
        }
      },
      onFailure: (err) => {
        console.log("err: ", err);
        alert(JSON.stringify(err));
      },
    });

    console.log("A function " + userName + " has finished.");
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>Login</h1>
        <form>
          <div className="form-item">
            <label htmlFor="email"></label>
            <input
              type="email"
              name="email"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              placeholder="Email Address"
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="button-panel">
            <input
              type="button"
              className="button"
              title="Sign In"
              value="Sign In"
              onClick={loginUser}
            ></input>
          </div>
        </form>
        <div className="form-footer">
          <p>
            <a href="/">Create an account</a>
          </p>
          <p>
            <a href="/">Forgot password?</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
