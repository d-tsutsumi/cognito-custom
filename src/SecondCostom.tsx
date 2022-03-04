import "./login.css";
import "./App.css";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const SecondCustom = () => {
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
        alert("Sccess!!!" + JSON.stringify(result));
      },
      onFailure: (err: any) => {
        console.log("err: ", err);
        alert(JSON.stringify(err));
      },
    });

    console.log("A function " + code + " has finished.");
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>input second code</h1>
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
              title="enter"
              value="enter"
              onClick={loginUser}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default SecondCustom;
