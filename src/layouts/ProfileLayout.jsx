import React, { useMemo, useState } from "react";
import { getCurrentUser } from "/src/api/FirestoreAPI";
import Navbar from "/src/components/common/navbar";
import Profile from "/src/Pages/Profile";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
}
