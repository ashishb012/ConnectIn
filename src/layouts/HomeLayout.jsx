import React, { useMemo, useState } from "react";
import Home from "/src/Pages/Home";
import { getCurrentUser } from "/src/api/FirestoreAPI";
import Navbar from "/src/components/common/navbar";

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Home currentUser={currentUser} />
    </div>
  );
}
