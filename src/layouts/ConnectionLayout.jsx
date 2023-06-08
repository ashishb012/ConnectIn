import React, { useMemo, useState } from "react";
import Connections from "../Pages/Connections";
import { getCurrentUser } from "../api/FirestoreAPI";
import Navbar from "../components/common/navbar";

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Connections currentUser={currentUser} />
    </div>
  );
}
