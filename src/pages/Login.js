import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="wrapper">
      <div className="formWrapper">
        <h2>LOG IN</h2>
        <div className="inputGroup">
          <input className="inputBox" type="text" placeholder="EMAIL" />
          <input className="inputBox" type="password" placeholder="PASSWORD" />
          <button className="btn loginBnt">LOG IN</button>
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
