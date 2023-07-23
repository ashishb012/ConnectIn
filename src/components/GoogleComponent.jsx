import React from "react";
import { GoogleSignInAPI } from "../api/AuthAPI";
import GoogleLogo from "../assets/googleLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import { getUniqueID } from "../helpers/getUniqueId";

export default function GoogleSignIn() {
  let navigate = useNavigate();

  const google = async () => {
    try {
      let res = await GoogleSignInAPI();
      localStorage.setItem("userEmail", res.user.email);
      postUserData({
        userID: getUniqueID(),
        name: res.user.displayName,
        email: res.user.email,
        imageLink:
          "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      });
      toast.success("Signed In to Linkedin!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("An error encountered");
      return;
    }
  };

  return (
    <div
      onClick={google}
      className="flex flex-row justify-center text-center border border-black rounded-full cursor-pointer hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline"
    >
      <img src={GoogleLogo} width={50} alt="google" className="p-1" />
      <button className="px-4 py-2 font-bold ">Continue with Google</button>
    </div>
  );
}
