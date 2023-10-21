import React, { useState, useEffect } from "react";
import { GoogleSignInAPI } from "../api/AuthAPI";
import GoogleLogo from "../assets/googleLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import { getAllUsers } from "../api/FirestoreAPI";

export default function GoogleSignIn() {
  const navigate = useNavigate();

  const [users, setUser] = useState([]);

  useEffect(() => {
    getAllUsers(setUser);
  }, []);

  const google = async () => {
    try {
      const res = await GoogleSignInAPI();
      localStorage.setItem("userEmail", res.user.email);
      const isNewuser = users.filter((user) => {
        return user.userID === res.user.uid;
      });
      if (isNewuser.length === 0) {
        postUserData({
          userID: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          imageLink:
            "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        });
      }
      toast.success("Signed In to ConnectIn!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("An error encountered");
      return;
    }
  };

  return (
    <div
      title="Google SignIn"
      onClick={google}
      className="flex flex-row justify-center text-center border border-black rounded-full cursor-pointer hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline"
    >
      <img src={GoogleLogo} width={50} alt="google logo" className="p-1" />
      <button className="px-4 py-2 font-bold ">Continue with Google</button>
    </div>
  );
}
