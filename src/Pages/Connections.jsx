import React, { useEffect, useState } from "react";
import ConnectionsComponent from "/src/components/ConnectionsComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "/src/firebaseConfig";
import Loader from "/src/components/common/Loader";

export default function Connections({ currentUser }) {
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
  return loading ? (
    <Loader />
  ) : (
    <ConnectionsComponent currentUser={currentUser} />
  );
  // return <ConnectionsComponent currentUser={currentUser} />;
}
