import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  return (
    <div className="bg-neutral-100">
      <img src={LinkedinLogo} className="w-32 pt-2 pl-4 sm:pl-10 " />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl ">
          <h1 className="my-3 text-3xl font-semibold ">Join LinkedIn</h1>
          <div className="my-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Name
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, name: event.target.value })
              }
              type="text"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password (6+ characters)
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type="password"
              className="w-full p-3 text-gray-700 border rounded focus:outline-gray-900 focus-within:shadow-lg"
            />
          </div>
          <div className="py-6 text-center">
            <button
              onClick={register}
              className="w-full py-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
            >
              Agree & Join
            </button>
          </div>
          <p className="text-center">OR</p>
          {/* TODO: Google */}
          <div className="my-4 ">
            <p className="text-center ">
              Already on LinkedIn? &nbsp;
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
