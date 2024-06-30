import React, { useEffect, useState } from "react";
import HomeComponent from "/src/components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "/src/firebaseConfig";
import Loader from "/src/components/common/Loader";

export default function Home({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        setLoading(false);
      } else {
        navigate("/");
      }
    });
  }, []);
  return loading ? <Loader /> : <HomeComponent currentUser={currentUser} />;
  // return <HomeComponent currentUser={currentUser} />;
}
