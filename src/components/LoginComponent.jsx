import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="bg-neutral-100">
      <img src={LinkedinLogo} className="w-32 pt-2 pl-10" />

      <div className="flex justify-center items-center h-screen">
        <div className=" bg-white max-w-md w-full p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold my-3 ">Sign in</h1>
          <div className="my-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="border rounded w-full text-gray-700 p-3 focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type="password"
              className="border rounded w-full text-gray-700 p-3 focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div className="my-6">
            <a
              className="text-blue-600 font-semibold hover:cursor-pointer hover:underline"
              href=""
            >
              Forgot password?
            </a>
          </div>
          <div className="text-center py-6 btn-block ">
            <button
              onClick={login}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-40 rounded-full  focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
          <p className="text-center">OR</p>
          {/* TODO: Google */}
          <div className=" my-4">
            <p className="text-center">
              New to LinkedIn?&nbsp;
              <span
                className="text-blue-600 font-semibold hover:cursor-pointer hover:underline"
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
