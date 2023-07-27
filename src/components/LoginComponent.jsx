import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import ConnectInLogo from "../assets/ConnectInLogo.png";
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
    toast.success("Signed In to ConnectIn!");
    navigate("/home");
  };

  return (
    <div className="bg-neutral-100">
      <img
        src={ConnectInLogo}
        alt="ConnectInLogo"
        title="ConnectInLogo"
        className="p-2 w-52"
      />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl ">
          <h1 className="my-3 text-3xl font-semibold ">Sign in</h1>
          <div className="my-6">
            <label
              title="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              title="email"
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div>
            <label
              title="Password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              title="Password"
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type="password"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div className="my-6" title="Forgot password?">
            <button
              className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
              onClick={() => navigate("/password-reset")}
            >
              Forgot password?
            </button>
          </div>
          <div title="login" className="py-4 text-center ">
            <button
              onClick={login}
              className="w-full py-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
          <p className="py-4 text-center">OR</p>
          <GoogleSignIn />
          <div title="New to ConnectIn? Register" className="my-4 ">
            <p className="text-center">
              New to ConnectIn?&nbsp;
              <span
                className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Join now
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Objective:
// The objective of the LoginComponent function is to render a login page for the ConnectIn web application, allowing users to enter their email and password to sign in, or use their Google account to sign in.

// Inputs:
// - None

// Flow:
// 1. The function initializes the navigate variable using the useNavigate hook from the react-router-dom library.
// 2. The function initializes the credentails state variable as an empty object using the useState hook from the react library.
// 3. The function defines a login function that is called when the user clicks the "Sign in" button.
// 4. The login function checks if the email and password fields are not empty, and displays an error message if they are.
// 5. The login function calls the LoginAPI function with the email and password as parameters.
// 6. The LoginAPI function returns a response object that is checked for error codes, and displays an error message if any are found.
// 7. If the LoginAPI function returns a successful response, the user's email is stored in local storage and the user is redirected to the home page.
// 8. The function returns JSX that renders the login page, including input fields for email and password, a "Forgot password?" button, a "Sign in" button, a "Join now" link, and a GoogleSignIn component.

// Outputs:
// - JSX that renders the login page for the ConnectIn web application.

// Additional aspects:
// - The function uses the toast library to display error and success messages to the user.
// - The function uses the GoogleSignIn component to allow users to sign in with their Google account.
// - The function uses the useHistory hook from the react-router-dom library to redirect the user to the home page after successful sign in.
