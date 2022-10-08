import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Login = () => {

  const [loginInfo, setloginInfo] = useState({ username: "", password: "" });
  // const [accessToken, setaccessToken] = useState("");
  const {userState, setUserState, isUserLogged} = useContext(UserContext);
  const history = useHistory();

  const submitLogin = () => {
    const { username, password } = loginInfo;
    
      axios
      .post("http://localhost:8000/sessions", loginInfo)
      .then(function (response) {
        setUserState({accessToken: response.data.accessToken});
        history.push("quote-list");
      })
      .catch(function (error) {
        console.log(error);
      });
      };

  return (
    <div className="login-container">
      <input
        type="text"
        placeholder="Username:"
        onChange={(e) => setloginInfo({ ...loginInfo, username: e.target.value })}
        value={loginInfo.username}></input>
      <br />
      <br />
      <input
        type="password"
        placeholder="Password:"
        onChange={(e) =>
          setloginInfo({ ...loginInfo, password: e.target.value })
        }
        value={loginInfo.password}></input>
      <br />
      <br />
      <button onClick={submitLogin}>Submit</button>
    </div>
  );
};

export default Login;
