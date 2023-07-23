import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleSignIn from "./GoogleComponent";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      if (!credentails.email || !credentails.password) {
        toast.error("Please enter email and password");
        return;
      }
      const res = await LoginAPI(credentails.email, credentails.password);
      if (res.code === "auth/invalid-email") {
        toast.error("invalid email");
        return;
      }
      if (res.code === "auth/wrong-password") {
        toast.error("wrong password");
        return;
      }
      if (res.code === "auth/user-not-found") {
        toast.error("user not found");
        return;
      }
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      toast.error("Please Check your Credentials");
      return;
    }
    toast.success("Signed In to Linkedin!");
    navigate("/home");
  };

  return (
    <div className="bg-neutral-100">
      <img src={LinkedinLogo} className="w-32 pt-2 pl-4 sm:pl-10" />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl ">
          <h1 className="my-3 text-3xl font-semibold ">Sign in</h1>
          <div className="my-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type="password"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div className="my-6">
            <button
              className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
              onClick={() => navigate("/password-reset")}
            >
              Forgot password?
            </button>
          </div>
          <div className="py-4 text-center ">
            <button
              onClick={login}
              className="w-full py-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
          <p className="py-4 text-center">OR</p>
          <GoogleSignIn />
          <div className="my-4 ">
            <p className="text-center">
              New to LinkedIn?&nbsp;
              <span
                className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Join now
              </span>
            </p>
            {/* TODO: Forgot password */}
          </div>
        </div>
      </div>
    </div>
  );
}
