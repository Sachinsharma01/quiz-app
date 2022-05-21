import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("logged In");
        localStorage.setItem("userState", "LOGGED_IN");
        // history.replace("/");
        window.location.reload("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="wrapper">
      <div className="formWrapper">
        <h2>LOG IN</h2>
        <div className="inputGroup">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="inputBox"
            type="text"
            placeholder="EMAIL"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="inputBox"
            type="password"
            placeholder="PASSWORD"
          />
          <button type="submit" onClick={signIn} className="btn loginBnt">
            LOG IN
          </button>
          <span className="createInfo">
            If you don't have an account then create &nbsp;
            <Link to="/" className="createNewBtn">
              signup
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
