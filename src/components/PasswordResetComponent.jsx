import React, { useState } from "react";
import { ResetPasswordAPI } from "/src/api/AuthAPI";
import ConnectInLogo from "/src/assets/ConnectInLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PasswordResetComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const sendResetPassword = async () => {
    if (!credentails.email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      let res = await ResetPasswordAPI(credentails.email);
      if (res.code === "auth/invalid-email") {
        toast.error("invalid email");
        return;
      }
      if (res.code === "auth/user-not-found") {
        toast.error("user not found");
        return;
      }
    } catch (err) {
      // toast.error("Please Check your Credential");
      return;
    }
    toast.success("Email sent successfully");
  };

  return (
    <div className="bg-neutral-100">
      <img
        src={ConnectInLogo}
        alt="ConnectInLogo"
        title="ConnectIn Logo"
        className="p-2 w-52"
      />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl ">
          <h1 className="my-3 text-3xl font-semibold ">Password reset</h1>
          <div className="my-6">
            <label
              title="Email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              title="Email"
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div title="Send password reset email" className="py-6 text-center">
            <button
              onClick={sendResetPassword}
              className="w-full py-2 font-bold text-white bg-blue-700 rounded-full cursor-pointer hover:bg-blue-800 focus:outline-none focus:shadow-outline"
            >
              Send password reset email
            </button>
            <div className="p-2">Check your email for further instructions</div>
          </div>
          <div title="Changed password? Login" className="my-4 ">
            <p className="text-center">
              Changed password?&nbsp;
              <span
                className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
