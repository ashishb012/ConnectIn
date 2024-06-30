import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "/src/api/AuthAPI";
import { getCurrentUser } from "/src/api/FirestoreAPI";
import Button from "/src/components/common/button.jsx";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="fixed z-20 h-auto p-5 mt-24 mr-4 border-2 border-gray-900 rounded-lg right-3 w-60 bg-slate-50">
      <p className="font-semibold text-center ">{currentUser?.name}</p>
      <p className="font-normal text-center">{currentUser?.headline}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate(`/p/${currentUser?.name}`, {
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
