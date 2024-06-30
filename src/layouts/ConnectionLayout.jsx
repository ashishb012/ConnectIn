import React, { useMemo, useState } from "react";
import Connections from "/src/Pages/Connections";
import { getCurrentUser } from "/src/api/FirestoreAPI";
import Navbar from "/src/components/common/navbar";

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
