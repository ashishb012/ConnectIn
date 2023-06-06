import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../api/AuthAPI";
import { getCurrentUser } from "../../api/FirestoreAPI";
import Button from "./button";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="absolute z-0 h-auto p-5 border-2 border-gray-900 rounded-lg right-8 top-24 w-60 bg-slate-50">
      <p className="font-semibold text-center ">{currentUser?.name}</p>
      <p className="font-normal">{currentUser?.headline}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}
