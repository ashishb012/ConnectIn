import React, { useEffect, useState } from "react";
import { getConnections } from "../../api/FirestoreAPI";

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);
  return isConnected ? (
    <></>
  ) : (
    <div className="flex flex-col items-center justify-center max-w-lg p-6 bg-white rounded">
      <img src={user.imageLink} className="block w-20 m-2" />
      <p className="p-2 font-semibold">{user.name}</p>
      <p className="p-1 font-normal ">{user.headline}</p>

      <button
        onClick={() => getCurrentUser(user.id)}
        className="px-8 py-1 font-bold text-white bg-blue-700 rounded-full  hover:bg-blue-800 focus:outline-none focus:shadow-outline"
      >
        Connect
      </button>
    </div>
  );
}
