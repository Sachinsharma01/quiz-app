import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setUserName("");
    createUserWithEmailAndPassword(auth, email, password).then(() => {
        console.log("User Created")
    })
  };
  return (
    <div className="wrapper">
      <div className="formWrapper">
        <h2>LOG IN</h2>
        <div className="inputGroup">
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="inputBox"
            type="text"
            placeholder="USERNAME"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="inputBox"
            type="email"
            placeholder="EMAIL"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="inputBox"
            type="password"
            placeholder="PASSWORD"
          />
          <button type="submit" onClick={signIn} className="btn SignUpBnt">
            LOG IN
          </button>
          <span className="createInfo">
            If you already have an account then &nbsp;
            <Link to="/login" className="createNewBtn">
              login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
