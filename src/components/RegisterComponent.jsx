import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import ConnectInLogo from "../assets/ConnectInLogo.png";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";
import GoogleSignIn from "./GoogleComponent";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async () => {
    try {
      if (!credentails.email || !credentails.password || !credentails.name) {
        toast.error("Please enter name, email, and password");
        return;
      }
      const res = await RegisterAPI(credentails.email, credentails.password);
      console.log(res.code);
      if (res.code === "auth/invalid-email") {
        toast.error("invalid email");
        return;
      }
      if (res.code === "auth/weak-password") {
        toast.error("weak password");
        return;
      }
      if (res.code === "auth/email-already-in-use") {
        toast.error("user already exists. Login");
        return;
      }
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
    toast.success("Signed In to ConnectIn!");
    postUserData({
      userID: getUniqueID(),
      name: credentails.name,
      email: credentails.email,
      imageLink:
        "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    });
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
          <h1 className="my-3 text-3xl font-semibold ">Join ConnectIn</h1>
          <div className="my-6">
            <label
              title="Name"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              title="Name"
              onChange={(event) =>
                setCredentials({ ...credentails, name: event.target.value })
              }
              type="text"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label
              title="Password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password (6+ characters)
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
          <div title="Agree & Join" className="py-4 text-center">
            <button
              onClick={register}
              className="w-full py-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
            >
              Agree & Join
            </button>
          </div>
          <p className="py-4 text-center ">OR</p>
          <GoogleSignIn />
          <div title="Already on ConnectIn? Login" className="my-4 ">
            <p className="text-center ">
              Already on ConnectIn? &nbsp;
              <span
                className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
