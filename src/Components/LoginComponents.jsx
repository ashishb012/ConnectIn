import React from "react";
import { LoginAPI } from "../api/AuthApi";
// import "../Sass/LoginComponents.scss";

export default function LoginComponents() {
  const login = () => {
    let res = LoginAPI();
    console.log(res);
  };
  return (
    <div>
      <h1>LoginComponents</h1>
      <button className="login-btn" onClick={login}></button>
    </div>
  );
}
