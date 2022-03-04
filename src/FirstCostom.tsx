import "./login.css";
import "./App.css";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const FirstCosutom = () => {
  const navigate = useNavigate();
  const { gCognitoUser, gCognitoUserPool } = useContext(AuthContext);
  const [code, setCode] = useState("");

  const loginUser = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    console.log(gCognitoUserPool);
    console.log(gCognitoUser);
    if (!gCognitoUserPool || !gCognitoUser) return;
    console.log("A function " + code + " has started.");
    gCognitoUser.sendCustomChallengeAnswer(code, {
      onSuccess: (result) => {
        console.log("result: ", result);
      },
      customChallenge: function (challengeParameters) {
        //gather user responses in challengeResponses based on challengeParameters
        console.log(challengeParameters)
        console.log(
          "reached custom challenge area" + JSON.stringify(challengeParameters)
        );
        if (challengeParameters.challenge === "hoge") {
          console.log("reached custom challenge hoge");
          navigate("/second");
        }
      },
      onFailure: (err) => {
        console.log("err: ", err);
        alert(JSON.stringify(err));
      },
    });

    console.log("A function " + code + " has finished.");
  };
  return (
    <>
      <div className="form-wrapper">
        <h1>enter first code </h1>
        <form>
          <div className="form-item">
            <label htmlFor="email"></label>
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="code"
            ></input>
          </div>
          <div className="button-panel">
            <input
              type="submit"
              className="button"
              title="code"
              value="enter"
              onClick={loginUser}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default FirstCosutom;
