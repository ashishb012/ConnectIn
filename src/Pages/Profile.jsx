import React, { useEffect, useState } from "react";
import ProfileComponent from "/src/components/ProfileComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "/src/firebaseConfig";
import Loader from "/src/components/common/Loader";

export default function Profile({ currentUser }) {
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
  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
  // return <ProfileComponent currentUser={currentUser} />;
}
