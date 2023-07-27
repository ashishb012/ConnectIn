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
    <div className="flex flex-col items-center justify-center max-w-lg p-6 bg-white border-2 border-gray-600 shadow-lg w-60 rounded-xl xl:rounded-full">
      <img
        src={user.imageLink}
        alt="user-image"
        className="block w-24 h-24 m-2 rounded-full"
      />
      <p className="p-2 font-semibold">{user.name}</p>
      <button
        onClick={() => getCurrentUser(user.id)}
        className="px-8 py-1 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
      >
        Connect
      </button>
    </div>
  );
}
