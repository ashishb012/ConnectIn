import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthApi";
import "../Sass/LoginComponent.scss";
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/LinkedinLogo.png";
import { toast } from "react-toastify";

export default function RegisterComponents() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("LinkedIn Account Created");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (e) {
      console.log(e);
      toast.error("There was some problem creating your Account");
    }
  };
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} alt="LinkedIn Logo" className="linkedinLogo" />
      <div className="login-wrapper-inner ">
        <h1 className="heading">Make the most of your professional life</h1>
        <div className="auth-inputs">
          <input
            onChange={(event) => {
              setCredentials({ ...credentials, name: event.target.value });
            }}
            className="common-input"
            placeholder="Your Name"
            type="text"
          />
          <input
            onChange={(event) => {
              setCredentials({ ...credentials, email: event.target.value });
            }}
            className="common-input"
            placeholder="Email"
            type="email"
          />
          <input
            onChange={(event) => {
              setCredentials({ ...credentials, password: event.target.value });
            }}
            className="common-input"
            placeholder="Password (6 or more characters)"
            type="password"
          />
        </div>
        <button className="login-btn" onClick={register}>
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      {/* Todo */}
      <div className="google-btn-container">
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
