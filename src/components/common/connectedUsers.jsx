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
    <div className="flex flex-col items-center justify-center bg-white rounded p-6">
      <img src={user.imageLink} className="block w-20 m-2" />
      <p className="font-semibold p-2">{user.name}</p>
      <p className=" font-normal p-1">{user.headline}</p>

      <button
        onClick={() => getCurrentUser(user.id)}
        className=" bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-8 rounded-full  focus:outline-none focus:shadow-outline"
      >
        Connect
      </button>
    </div>
  );
}
