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
    <div className="flex flex-col justify-center h-auto p-5 border-2 border-gray-900 rounded-lg w-60 bg-slate-50">
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
