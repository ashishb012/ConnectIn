import React, { useEffect, useState } from "react";
import HomeComponents from "../Components/HomeComponents";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (res) => {
        if (!res?.accessToken) {
          navigate("/");
        }
      }
      //   else {}
    );
  });
  return <HomeComponents />;
}
