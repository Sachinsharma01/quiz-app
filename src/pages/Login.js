import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setUserName("");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("logged In");
        localStorage.setItem("userState", "LOGGED_IN");
        localStorage.setItem("userName", userName);
        // history.replace("/");
        window.location.reload("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="wrapper">
      <form className="formWrapper">
        <h2>LOG IN</h2>
        <div className="inputGroup">
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="inputBox"
            required
            type="text"
            placeholder="USERNAME"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="inputBox"
            required
            type="email"
            placeholder="EMAIL"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="inputBox"
            required
            type="password"
            placeholder="PASSWORD"
          />
          <button type="submit" onClick={signIn} className="btn loginBnt">
            LOG IN
          </button>
          <span className="createInfo">
            If you don't have an account then create &nbsp;
            <Link to="/signup" className="createNewBtn">
              signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
